export default function OtherSection(){
    return <>
      <div className="page-section" id="laboratories-section">
                    <div className="hero-section mb-6" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"}}>
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold">Laboratory Management</h1>
                            <p className="mt-2">Manage laboratory tests and results</p>
                        </div>
                    </div>
                    <div className="card p-6 text-center">
                        <i className="fas fa-flask text-5xl text-blue-500 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Laboratories Section</h3>
                        <p className="text-gray-600">This section would contain laboratory test management, results tracking, and reports.</p>
                    </div>
                </div>

                <div className="page-section" id="billing-section">
                    <div className="hero-section mb-6" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80')"}}>
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold">Billing & Payments</h1>
                            <p className="mt-2">Manage patient billing and payment records</p>
                        </div>
                    </div>
                    <div className="card p-6 text-center">
                        <i className="fas fa-file-invoice-dollar text-5xl text-blue-500 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Billing Section</h3>
                        <p className="text-gray=600">This section would contain billing records, invoices, payments, and financial reports.</p>
                    </div>
                </div>

                <div className="page-section" id="settings-section">
                    <div className="hero-section mb-6" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"}}>
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold">System Settings</h1>
                            <p className="mt-2">Configure hospital management system settings</p>
                        </div>
                    </div>
                    <div className="card p-6 text-center">
                        <i className="fas fa-cog text-5xl text-blue-500 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Settings Section</h3>
                        <p className="text-gray-600">This section would contain system configurations, user permissions, and other administrative settings.</p>
                    </div>
                </div>
                
    </>
}