export interface OrdemDeServico {
    ordemdeservicoid: string;
    clienteid: string;
    veiculo: string;
    dataehoraentrada: Date;

}

export const ordemDeServicoConverter = {
    toFirestore: (ordemDeServico: any) => {
        return <OrdemDeServico>{
            clienteid: ordemDeServico.clienteid,
            veiculo: ordemDeServico.veiculo,
            dataehoraentrada: ordemDeServico.dataehoraentrada,

        };
    },
    fromFirestore: (snapshot: any, option: any) => {
        const data = snapshot.data(option);
        return <OrdemDeServico>{
            ordemdeservicoid: snapshot.id,
            clienteid: data.clienteId,
            veiculo:data.veiculo,
            dataehoraentrada: data.dataehoraentrada.toDate(),
        }

    }
};