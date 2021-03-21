const world = 'Hi';

export function Hello(word: string = world): string {
    return `Hello ${world}`;
}