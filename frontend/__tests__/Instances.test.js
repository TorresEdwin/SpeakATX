import Instances from '../src/pages/instances.jsx';

describe('Instances class', () => {
    describe('matchingValues static method', () => {
        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("chinese", "chinese")).toBe(true);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("chinese, english", "chinese")).toBe(true);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("english", "chinese, english")).toBe(true);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("chinese, english", "chinese, vietnamese")).toBe(true);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("english", "spanish")).toBe(false);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("chinese, english", "vietnamese")).toBe(false);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("english", "English")).toBe(true);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("chinese, english", "chinese")).toBe(true);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("Abkhaz", "ABKHAZ")).toBe(true);
        });

        test('should return true when values are equal', () => {
            expect(Instances.matchingValues("korean", "chinese", "vietnamese")).toBe(false);
        });

        test('test filtering', () => {
            const item = [
                { language: 'spanish' },
                { language: 'spanish' },
                { language: 'french' },
                { language: 'chinese' }
              ];
            expect(Instances.getLangFiltered(item, 'spanish').length).toBe(2);
        });

        test('test sorting', () => {
            const item = [
                { name: 'c' },
                { name: 'b' },
                { name: 'a' }
              ];
            Instances.communities = item;
            Instances.sortCommunities('name', false)
            expect(Instances.communities[0].name).toBe('a');
        });
    });
});
