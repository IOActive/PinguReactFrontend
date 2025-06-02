// src/helpers/config-loader.jsx
import axios from 'axios';
import yaml from 'js-yaml';

async function loadConfig() {
  try {
    const response = await axios.get('/config/frontend/config.yaml');
    return yaml.load(response.data);
  } catch (error) {
    console.error('Failed to load config:', error);
    return null;
  }
}

export default loadConfig;