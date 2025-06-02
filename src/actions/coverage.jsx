import CoverageService from "services/coverage_service";
import { action_request, action_recieved, action_error } from "./action"
import {
    RETRIEVE_COVERAGE,
    COVERAGE_REQUEST,
    COVERAGE_FAILURE,
    DOWNLOAD_ARTIFACTS,
    DOWNLOAD_REPORT,
} from "./types";

export const get_project_coverage = (project_id) => async (dispatch) => {
    dispatch(action_request(COVERAGE_REQUEST));
    return CoverageService.get_project_coverages(project_id).then(
        (response) => {
            dispatch(action_recieved(RETRIEVE_COVERAGE, response.data));
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data;
            dispatch(action_error(COVERAGE_FAILURE, message));
            return Promise.reject();
        }
    );
};


export const download_coverage_artifacts = (project_id) => {
  return CoverageService.download_coverage_artifacts(project_id).then(
    (response) => {
      try {
        // Extract filename from Content-Disposition header
        const contentDisposition = response.headers["content-disposition"];
        let filename = `${project_id}_coverage.zip`; // Default name

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="(.+)"/);
          if (match && match[1]) {
            filename = match[1];
          }
        }

        // Convert response into a downloadable file
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);

        // Create a link and trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = filename; // Use extracted filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        return Promise.resolve();
      } catch (error) {
        console.error("Error processing file:", error);
        return Promise.reject(error);
      }
    },
    (error) => {
      console.error("Download failed:", error);
      return Promise.reject(error);
    }
  );
};
