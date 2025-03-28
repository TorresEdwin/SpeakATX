class Instances {
    
    static loaded = false;

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

    static sortServices(sortParam, reverse) {
        if (sortParam === "name") {
            Instances.translations.sort((a, b) => a.name.localeCompare(b.name) * reverse ? -1 : 1);
        } else if (sortParam === "rating") {
            Instances.translations.sort((a, b) => (a.rating - b.rating) * reverse ? -1 : 1);
        } else if (sortParam === "language") {
            Instances.translations.sort((a, b) => a.language.localeCompare(b.language) * reverse ? -1 : 1);
        } else if (sortParam === "area") {
            Instances.translations.sort((a, b) => a.area.localeCompare(b.area) * reverse ? -1 : 1);
        } else if (sortParam === "price") {
            Instances.translations.sort((a, b) => (a.price - b.price) * reverse ? -1 : 1);
        }
    }
}

export default Instances