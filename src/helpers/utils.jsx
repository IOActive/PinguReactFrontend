/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import { Buffer } from 'buffer';

export function beautify_key_names(key) {
  key = key.replace(/_/g, " ");
  // uppercase first letter of each word
  key = key.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  return key;
}

export function beautify_date(dateString) { 
  // date format is "2023-03-23T19:01:26.688000Z" beautify it
  const newDateString = `${dateString.split("T")[0]} at ${dateString.split("T")[1].split(".")[0]}`;
    return newDateString;
}


export function isDateString(str) {
  const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}Z/;
  if (dateFormat.test(str)) {
    return true;
  } else {
    return false;
  }
}

export function decode_base64(str) {
  const buffer = Buffer.from(str, 'base64');
  return buffer.toString();
}