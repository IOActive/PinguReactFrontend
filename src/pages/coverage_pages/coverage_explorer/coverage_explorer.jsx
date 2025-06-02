import { useEffect, useState } from "react";
import { PageHeader } from "components/PageHeader/PageHeader";
import { useSelector, useDispatch } from "react-redux";
import { get_project_coverage, download_coverage_artifacts } from "actions/coverage";
import cx from "classnames";
import s from "./coverage_explorer.module.scss";
import { Button, CardGroup } from "reactstrap";
import { Card, Spinner } from "react-bootstrap";
import FilterDropdown from "components/FilterDropdown/filter_dropdown";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CoverageExplorer = () => {
    const [coverageData, setCoverageData] = useState(null);
    const [coverageReportNames, setCoverageReportNames] = useState([]);
    const [iframeSrc, setIframeSrc] = useState(""); // Stores the blob URL

    const { payload, isFetching } = useSelector((state) => state.coverages);
    const active_project = useSelector((state) => state.active_project);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [currentCoverageReport, setCurrentCoverageReport] = useState("global");

    useEffect(() => {
        if (active_project) {
            dispatch(get_project_coverage(active_project)).catch((error) => console.error('Failed to fetch coverage report', error));;
        }
    }, [active_project, dispatch]);

    useEffect(() => {
        if (payload) {
            setCoverageData(payload);
            setCoverageReportNames(Object.keys(payload).map((key) => ({ id: key })));
            fetchCoverageReport(payload[currentCoverageReport]);
        }
    }, [payload, currentCoverageReport]);

    async function fetchCoverageReport(url) {
        if (!url) return;

        try {
            const AUTH_TOKEN = localStorage.getItem('access_token');
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${AUTH_TOKEN}`,  // ✅ Pass authentication token
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch coverage report");
            }

            const blob = await response.blob(); // Convert response to Blob
            const blobUrl = URL.createObjectURL(blob); // Create a temporary URL
            setIframeSrc(blobUrl); // Set iframe source
        } catch (error) {
            console.error("Error loading coverage report:", error);
        }
    }

    function handleExplorerSwitch(value) {
        setCurrentCoverageReport(value);
    }

    function download_artifacts() {
        setLoading(true);
        download_coverage_artifacts(active_project)
            .then(() => console.log("Download successful"))
            .catch(() => alert("Failed to download the file"))
            .finally(() => setLoading(false));
    }

    if (isFetching) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <div className={s.root}>
            <PageHeader title="Coverage Explorer" />
            <CardGroup>
                <Card>
                    <Card.Header>
                        {coverageData && !isFetching ? (
                            <FilterDropdown
                                targets={coverageReportNames}
                                select_f={handleExplorerSwitch}
                                title="Coverage Report"
                                default_value="global"
                            />
                        ) : null}
                    </Card.Header>
                    <Card.Body>
                        {coverageData && !isFetching && iframeSrc ? (
                            <iframe
                                src={iframeSrc}
                                title="Coverage Report"
                                width="100%"
                                height="600px"
                                style={{ border: "none" }}
                            />
                        ) : (

                            <div className="d-flex flex-column align-items-center text-muted">
                                <h3><FontAwesomeIcon icon={faWarning} size={100} /></h3>
                                <h3>Coverage Files Not Supported</h3>
                                <p>
                                    The system cannot display the coverage files, but you can still download them.
                                </p>
                            </div>
                        )}
                    </Card.Body>
                    <Card.Footer>
                        <Button className={cx(s.DownloadButton)} onClick={download_artifacts} disabled={loading} >
                            {loading ? "Downloading..." : "Download Coverage Report"}
                        </Button>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </div>
    );
};

export default CoverageExplorer;
