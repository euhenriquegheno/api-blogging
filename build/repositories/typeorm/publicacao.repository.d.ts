import { IPublicacaoRepository } from '../publicacao.repository.interface';
import { IPublicacao } from '../../entities/models/publicacao.interface';
export declare class PublicacaoRepository implements IPublicacaoRepository {
    private repository;
    constructor();
    findAll(page: number, limit: number): Promise<IPublicacao[]>;
    findById(id: string): Promise<IPublicacao | null>;
    create(publicacao: IPublicacao): Promise<IPublicacao>;
    update(publicacao: IPublicacao): Promise<IPublicacao>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=publicacao.repository.d.ts.map