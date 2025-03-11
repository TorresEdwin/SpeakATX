// In a file like dataService.js or apiContext.js
import axios from 'axios';
import Instances from "./instances.jsx";

// Create a simple data store
const InstanceLoader = {
  isLoaded: false,
  
  // Method to initialize the data
  initialize: async function() {
    if (!this.isLoaded) {
      try {
        const job_response = await axios.get('https://api.speakatx.me/get/jobs', {
                timeout: 1000, // 10 seconds timeout
            }
        );
        const service_response = await axios.get('https://api.speakatx.me/get/translations', {
                timeout: 1000, // 10 seconds timeout
            }
        );
        const comm_response = await axios.get('https://api.speakatx.me/get/communities', {
                timeout: 1000, // 10 seconds timeout
            }
        );
        this.isLoaded = true;

        Instances.jobs = job_response.data.items;
        Instances.translations = service_response.data.items;
        Instances.communities = comm_response.data.items;

        console.log('Data loaded in background');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  },
};

// Initialize immediately when this module is imported
InstanceLoader.initialize();

export default InstanceLoader;