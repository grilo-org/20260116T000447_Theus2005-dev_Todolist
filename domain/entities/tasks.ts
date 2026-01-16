export interface Task{
    id: number,
    titulo: string,
    descricao?: string,
    data_encerramento: string,
    data_conclusao?: string,
    status?: string,
    data_edicao?: string
}