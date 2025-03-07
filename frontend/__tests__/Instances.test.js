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
    });
});
