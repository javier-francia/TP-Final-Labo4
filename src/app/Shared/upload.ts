export class Upload {
    $key: string;
    file:File;
    name:string;
    url:string;
    progress:number;
    extension: string;
    createdAt: Date = new Date(Date.now());

    constructor(file:File)
    {
        this.file = file;
    }
}