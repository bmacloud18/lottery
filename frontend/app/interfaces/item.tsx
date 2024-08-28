//interface for items being selected from. start degree indicates to the selection function where the arc begins
//in relation to the 'spinner' (the yellow line)
//colors are set randomly from the colors list, and randomized after the list is exhausted
export default interface Item {
    id: number;
    name: string;
    startDegree: number;
    color: string;
}