
import './App.css';
// import Card from './Card';
// import Navbar from './Navbar';

function App() {
  return (
    <div>
      <div id="app">
        <div id="sidebar" class="">
          <div className="sidebar-wrapper active ps ps--active-y">
            <div className="sidebar-header">
              <div className="d-flex justify-content-between">
                <div className="logo">
                  <a href="index.html"><img src="assets/images/logo/logo.png" alt="Logo" srcset="" /></a>
                </div>
                <div className="toggler">
                  <a href=".#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                </div>
              </div>
            </div>
            <div className="sidebar-menu">
              <ul className="menu">
                <li className="sidebar-title">Menu</li>

                <li className="sidebar-item  ">
                  <a href="index.html" className="sidebar-link">
                    <i className="bi bi-grid-fill"></i>
                    <span>Dashboard</span>
                  </a>
                </li>

                <li className="sidebar-item  has-sub">
                  <a href=".#" className="sidebar-link">
                    <i className="bi bi-stack"></i>
                    <span>Components</span>
                  </a>
                  <ul className="submenu ">
                    <li className="submenu-item ">
                      <a href="component-alert.html">Alert</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="component-badge.html">Badge</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="component-breadcrumb.html">Breadcrumb</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="component-button.html">Button</a>
                    </li>
                  </ul>
                </li>

                <li className="sidebar-item  has-sub">
                  <a href=".#" className="sidebar-link">
                    <i className="bi bi-collection-fill"></i>
                    <span>Extra Components</span>
                  </a>
                  <ul className="submenu ">
                    <li className="submenu-item ">
                      <a href="extra-component-avatar.html">Avatar</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="extra-component-sweetalert.html">Sweet Alert</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="extra-component-toastify.html">Toastify</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="extra-component-rating.html">Rating</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="extra-component-divider.html">Divider</a>
                    </li>
                  </ul>
                </li>

                <li className="sidebar-item active has-sub">
                  <a href=".#" class="sidebar-link">
                    <i className="bi bi-grid-1x2-fill"></i>
                    <span>Layouts</span>
                  </a>
                  <ul className="submenu active">
                    <li className="submenu-item active">
                      <a href="layout-default.html">Default Layout</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="layout-vertical-1-column.html">1 Column</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="layout-vertical-navbar.html">Vertical with Navbar</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="layout-horizontal.html">Horizontal Menu</a>
                    </li>
                  </ul>
                </li>

                <li className="sidebar-title">Forms &amp; Tables</li>

                <li className="sidebar-item  has-sub">
                  <a href=".#" class="sidebar-link">
                    <i className="bi bi-hexagon-fill"></i>
                    <span>Form Elements</span>
                  </a>
                  <ul className="submenu ">
                    <li className="submenu-item ">
                      <a href="form-element-input.html">Input</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="form-element-input-group.html">Input Group</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="form-element-select.html">Select</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="form-element-radio.html">Radio</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="form-element-checkbox.html">Checkbox</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="form-element-textarea.html">Textarea</a>
                    </li>
                  </ul>
                </li>

                <li className="sidebar-item  ">
                  <a href="form-layout.html" className="sidebar-link">
                    <i className="bi bi-file-earmark-medical-fill"></i>
                    <span>Form Layout</span>
                  </a>
                </li>

                <li className="sidebar-item  has-sub">
                  <a href=".#" className="sidebar-link">
                    <i className="bi bi-pen-fill"></i>
                    <span>Form Editor</span>
                  </a>
                  <ul className="submenu ">
                    <li className="submenu-item ">
                      <a href="form-editor-quill.html">Quill</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="form-editor-ckeditor.html">CKEditor</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="form-editor-summernote.html">Summernote</a>
                    </li>
                    <li className="submenu-item ">
                      <a href="form-editor-tinymce.html">TinyMCE</a>
                    </li>
                  </ul>
                </li>

                <li className="sidebar-item  ">
                  <a href="table.html" class="sidebar-link">
                    <i className="bi bi-grid-1x2-fill"></i>
                    <span>Table</span>
                  </a>
                </li>

                <li className="sidebar-item  ">
                  <a href="table-datatable.html" className="sidebar-link">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    <span>Datatable</span>
                  </a>
                </li>


              </ul>
            </div>
            <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
          </div>
          <div id="main">
            <header className="mb-3">
              <a href=".#" class="burger-btn d-block d-xl-none">
                <i className="bi bi-justify fs-3"></i>
              </a>
            </header>

            <div className="page-heading">
              <div className="page-title">
                <div className="row">
                  <div className="col-12 col-md-6 order-md-1 order-last">
                    <h3>Layout Default</h3>
                    <p className="text-subtitle text-muted">The default layout </p>
                  </div>
                  <div className="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Layout Default</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <section className="section">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Default Layout</h4>
                  </div>
                  <div className="card-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, commodi? Ullam quaerat
                    similique iusto
                    temporibus, vero aliquam praesentium, odit deserunt eaque nihil saepe hic deleniti? Placeat
                    delectus
                    quibusdam ratione ullam!
                  </div>
                </div>
              </section>
            </div>

            <footer>
              <div className="footer clearfix mb-0 text-muted">
                <div className="float-start">
                  <p>2021 © Mazer</p>
                </div>
                <div className="float-end">
                  <p>Crafted with <span className="text-danger"><i className="bi bi-heart"></i></span> by <a href="http://ahmadsaugi.com">A. Saugi</a></p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
