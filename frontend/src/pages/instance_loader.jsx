// In a file like dataService.js or apiContext.js
import axios from 'axios';
import Instances from "./instances.jsx";

// Create a simple data store
const InstanceLoader = {
  list: [],
  isLoaded: false,
  
  // Method to initialize the data
  initialize: async function() {
    if (!this.isLoaded) {
      try {
        const job_response = await axios.get('https://api.speakatx.me/get/jobs');
        this.list = job_response.data;
        this.isLoaded = true;
        console.log('Data loaded in background');
        alert(this.list);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  },
};

// Initialize immediately when this module is imported
InstanceLoader.initialize();

export default InstanceLoader;