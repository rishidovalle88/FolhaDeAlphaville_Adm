const toggler = document.querySelectorAll(".menu-toggle");
toggler.forEach(item => {
    item.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });
}); 


function isMobileResolution() {
    return window.innerWidth > 768; // Defina o limite de largura para considerar como dispositivo móvel
}

// Função para alternar a classe "collapsed" no elemento com o ID "sidebar"
function toggleSidebar() {
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("collapsed");
}

// Verifica a resolução ao carregar a página
window.addEventListener("load", function () {
    if (isMobileResolution()) {
        toggleSidebar();
    }
});


fetch("../assets/data/menu.json").then(
    response => response.json()
)
    .then(data => {
        menu = data
        side_root.innerHTML = HandleSideMenu();
        HandleMainMenu();
    });

const root = document.querySelector("#root");

function HandleSideMenu() {
    return (`
        <ul class="sidebar-nav">            
            ${menu.data.map(item => {
                return `                    
                    <li class="sidebar-header">
                        ${item.system}
                    </li>
                    ${item.menus.map(submenu => {
                        return `
                            <li class="sidebar-item">
                                <a class="sidebar-link" onclick="HandleSubmenus('${item.system}', ${submenu.id})"
                                    aria-expanded="false">
                                    <i class="${submenu.icon}"></i>
                                    ${submenu.name}
                                </a>
                            </li>
                        `
                    }).join("")}
                `
            }).join("")}
        </ul>    
        `
    )
}

function HandleMainMenu() {
    const el = (
        `
            ${menu.data.map(item => {
                return `                    
                    <div class="row mb-3">  
                        <h3>${item.system}</h3>
                        ${item.menus.map(submenu => {
                            return `
                                <div class="col-6 col-sm-4 col-md-3 p-2">
                                    <div class="card animation-selected">
                                        <a href="#" class="text-decoration-none" onclick="HandleSubmenus('${item.system}', ${submenu.id})">
                                            <div class="card-body lh-1">
                                                <i class="${submenu.icon} mb-5"></i>
                                                <h6 class="card-title">${submenu.name}</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            `
                        }).join("")}
                    </div>
                `
            }).join("")}
        `
        
    )
    BuildRoot(el);

}


function HandleSubmenus(systemName, idSubmenu) {

    const _menu = menu.data.find(item => item.system === systemName);
    const _submenu = _menu.menus.find(item => item.id === idSubmenu);


    if (!_submenu)
        return null;

    const el = (
        `
            <h3>${_submenu.name}</h3>
            <small>Módulo de ${_submenu.name} do sistema ${systemName}</small>
            <div class="row">        
                ${_submenu.submenus.map(item => {
                    return `
                        <div class="col-6 col-sm-4 col-md-3 p-2">
                            <div class="card animation-selected">
                                <a href="${item.url}" class="text-decoration-none">
                                    <div class="card-body lh-1">
                                        <i class="${item.icon} mb-5"></i>
                                        <h6 class="card-title">${item.name}</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                        `
                    }).join("")
                }        
            </div>
        `
    )
    BuildRoot(el);

}

function BuildRoot(el) {
    root.innerHTML = el;
}