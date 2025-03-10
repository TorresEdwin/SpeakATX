class Instances {
    
    static jobs = [
        
    ]; 

    static translations = [
        
    ];
    
    static communities = [
        
    ]; 

    static matchingValues(str1, str2) {
        // Split the strings into arrays and remove extra spaces (if any)
        const arr1 = str1.toLowerCase().split(',').map(item => item.trim());
        const arr2 = str2.toLowerCase().split(',').map(item => item.trim());
    
        // Convert arrays to Sets for easy comparison
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
    
        // Check if there's any intersection between the two sets
        for (let value of set1) {
            if (set2.has(value)) {
                return true; // Matching value found
            }
        }
        return false; // No matching values
    }
}

export default Instances