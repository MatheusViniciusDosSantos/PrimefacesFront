import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { EstadoService } from '../service/EstadoService';

const EstadoCrud = () => {
    let emptyEstado = {
        id: null,
        name: '',
        sigla: ''
    };

    const [estados, setEstados] = useState(null);
    const [estadoDialog, setEstadoDialog] = useState(false);
    const [deleteEstadoDialog, setDeleteEstadoDialog] = useState(false);
    const [deleteEstadosDialog, setDeleteEstadosDialog] = useState(false);
    const [estado, setEstado] = useState(emptyEstado);
    const [selectedEstados, setSelectedEstados] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const estadoService = new EstadoService();
        estadoService.getEstados().then(data => setEstados(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setEstado(emptyEstado);
        setSubmitted(false);
        setEstadoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setEstadoDialog(false);
    }

    const hideDeleteEstadoDialog = () => {
        setDeleteEstadoDialog(false);
    }

    const hideDeleteEstadosDialog = () => {
        setDeleteEstadosDialog(false);
    }

    const saveEstado = () => {
        setSubmitted(true);

        if (estado.name.trim()) {
            let _estados = [...estados];
            let _estado = { ...estado };
            if (estado.id) {
                const index = findIndexById(estado.id);

                _estados[index] = _estado;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Estado Updated', life: 3000 });
            }
            else {
                _estado.id = createId();
                _estado.image = 'estado-placeholder.svg';
                _estados.push(_estado);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Estado Created', life: 3000 });
            }

            setEstados(_estados);
            setEstadoDialog(false);
            setEstado(emptyEstado);
        }
    }

    const editEstado = (estado) => {
        setEstado({ ...estado });
        setEstadoDialog(true);
    }

    const confirmDeleteEstado = (estado) => {
        setEstado(estado);
        setDeleteEstadoDialog(true);
    }

    const deleteEstado = () => {
        let _estados = estados.filter(val => val.id !== estado.id);
        setEstados(_estados);
        setDeleteEstadoDialog(false);
        setEstado(emptyEstado);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Estado Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < estados.length; i++) {
            if (estados[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteEstadosDialog(true);
    }

    const deleteSelectedEstados = () => {
        let _estados = estados.filter(val => !selectedEstados.includes(val));
        setEstados(_estados);
        setDeleteEstadosDialog(false);
        setSelectedEstados(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Estados Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _estado = { ...estado };
        _estado['category'] = e.value;
        setEstado(_estado);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _estado = { ...estado };
        _estado[`${name}`] = val;

        setEstado(_estado);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _estado = { ...estado };
        _estado[`${name}`] = val;

        setEstado(_estado);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedEstados || !selectedEstados.length} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`assets/demo/images/estado/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        )
    }

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    }

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readonly cancel={false} />
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`estado-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editEstado(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteEstado(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Estados</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const estadoDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveEstado} />
        </>
    );
    const deleteEstadoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEstadoDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteEstado} />
        </>
    );
    const deleteEstadosDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEstadosDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedEstados} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={estados} selection={selectedEstados} onSelectionChange={(e) => setSelectedEstados(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} estados"
                        globalFilter={globalFilter} emptyMessage="No estados found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                        <Column field="code" header="Code" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="price" header="Price" body={priceBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={estadoDialog} style={{ width: '450px' }} header="Estado Details" modal className="p-fluid" footer={estadoDialogFooter} onHide={hideDialog}>
                        {estado.image && <img src={`assets/demo/images/estado/${estado.image}`} alt={estado.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={estado.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !estado.name })} />
                            {submitted && !estado.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={estado.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={estado.category === 'Accessories'} />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={estado.category === 'Clothing'} />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={estado.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={estado.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={estado.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={estado.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteEstadoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEstadoDialogFooter} onHide={hideDeleteEstadoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {estado && <span>Are you sure you want to delete <b>{estado.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteEstadosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEstadosDialogFooter} onHide={hideDeleteEstadosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {estado && <span>Are you sure you want to delete the selected estados?</span>}
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

export default React.memo(EstadoCrud, comparisonFn);