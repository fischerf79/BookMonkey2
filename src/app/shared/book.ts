import { Thumbnail } from './thumbnail';
export { Thumbnail } from './thumbnail';

export class Book {
  constructor(
    // public id: number,
    public isbn: string,
    public title: string,
    public authors: Array<string>,
    public published: Date,
    public subtitle?: string,
    public rating?: number,
    public thumbnails?: Array<Thumbnail>,
    public description?: string
  ){ }
}
