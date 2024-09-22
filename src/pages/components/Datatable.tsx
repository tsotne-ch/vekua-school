
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

interface Product {
    id: string | null;
    code: string;
    name: string;
    description: string;
    image: string | null;
    price: number;
    category: string | null;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

interface Student {

}

export default function ProductsDemo() {
    let emptyProduct: Product = {
        id: null,
        code: '',
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK',
    };

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Product[]>>(null);

    useEffect(() => {
        setProducts([{
            id: '1',
            code: '123',
            name: 'bdczxsa',
            image: null,
            description: '',
            category: null,
            price: 0,
            quantity: 0,
            rating: 0,
            inventoryStatus: 'INSTOCK',
        }, {
            id: '2',
            code: '234',
            name: 'asdfas',
            image: null,
            description: '',
            category: null,
            price: 0,
            quantity: 0,
            rating: 0,
            inventoryStatus: 'INSTOCK',
        }]);
    }, []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };


    const exportCSV = () => {
        dt.current?.exportCSV();
    };


    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">

            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const priceBodyTemplate = (rowData: Product) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData: Product) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData: Product) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };


    const getSeverity = (product: Product) => {
        switch (product.inventoryStatus) {
            case 'paid':
                return 'success';

            case 'warned':
                return 'warning';

            case 'unpaid':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 items-center justify-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" className='rounded-lg' placeholder="Search..." onInput={(e) => { const target = e.target as HTMLInputElement; setGlobalFilter(target.value); }} />
            </IconField>
        </div>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card font-glaho">
                <Toolbar className="mb-4 border rounded-xl overflow-hidden" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable className='border rounded-xl overflow-hidden' ref={dt} value={products} selection={selectedProducts}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedProducts(e.value);
                        }
                    }}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}
                    selectionMode="multiple"
                >
                    <Column field="code" header="პ/ნ" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="სახელი და გვარი" style={{ minWidth: '16rem' }}></Column>
                    <Column field="price" header="დრო" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="category" header="საგანი" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="inventoryStatus" header="სტატუსი" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>




        </div>
    );
}
