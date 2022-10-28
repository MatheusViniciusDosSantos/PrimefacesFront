import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MarcaService } from '../../service/MarcaService';

const Marca = () => {
    let objetoNovo = {
        descricao: ''
    }

    const [objetos, setObjetos] = useState(null);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const objetoService = new MarcaService();

    useEffect(() => {
        if (objetos == null) {
            objetoService.getMarcas().then(res => {
                setObjetos(res.data.content);
            });
        }
    }, []);
    

    

    const openNew = () => {
        setObjeto(objetoNovo);
        setSubmitted(false);
        setObjetoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setObjetoDialog(false);
    }

    const hideDeleteObjetoDialog = () => {
        setObjetoDeleteDialog(false);
    }

    const saveObjeto = () => {
        setSubmitted(true);

        if(objeto.descricao.trim()) {
            let _objeto = { ...objeto };
            if (!objeto.id) {
                objetoService.postMarca(_objeto).then(data => {
                    toast.current.show({serverity: 'success', summary: 'Sucesso', detail: 'Alteração realizada com sucesso!'});
                    setObjetos(null);
                });
            } else {
                objetoService.putMarca(_objeto).then(data => {
                    toast.current.show({ serverity: 'success', summary: 'Sucesso', detail: 'Inserção realizada com sucesso!' });
                    setObjetos(null);
                });
            }
            setObjetoDialog(false);
            setObjeto(objetoNovo);
        }
    }

    const editObjeto = (objeto) => {
        setObjeto({ ...objeto });
        setObjetoDialog(true);
    }

    const confirmDeleteObjeto = (objeto) => {
        setObjeto(objeto);
        setObjetoDeleteDialog(true);
    }

    const deleteObjeto = () => {
        objetoService.deleteMarca(objeto.id);
        toast.current.show({ serverity: 'success', summary: 'Sucesso', detail: 'Removido com sucesso!' });
        hideDeleteObjetoDialog();
        setObjetos(null);

    }

    const onInputChange = (event) => {
        setObjeto({ ...objeto, [event.target.id]: event.target.value });
    }

    const leftToolbarTemplate = () => {
        return(
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo Marca" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    }

    const idBodyTemlpate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    }

    const descricaoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Descrição</span>
                {rowData.descricao}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editObjeto(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteObjeto(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Marcas Cadastro</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const objetoDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveObjeto} />
        </>
    );
    const deleteObjetoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteObjetoDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteObjeto} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={objetos ? objetos: []}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last}. Total de {totalRecords} marcas"
                        globalFilter={globalFilter} emptyMessage="Nenhuma marca encontrada." header={header} responsiveLayout="scroll">
                        <Column field="id" header="ID" body={idBodyTemlpate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="descricao" header="Descrição" sortable body={descricaoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={objetoDialog} style={{ width: '450px' }} header="Marca Details" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>
                        
                        <div className="field">
                            <label htmlFor="descricao">Descrição</label>
                            <InputText id="descricao" value={objeto.descricao} onChange={onInputChange} />
                            {submitted && !objeto.descricao && <small className="p-invalid">Descrição é requerido.</small>}
                        </div>

                    </Dialog>

                    <Dialog visible={objetoDeleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {objeto && <span>Você tem certeza que quer deletar o marca: <b>{objeto.descricao}</b>?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );

}


const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Marca, comparisonFn);