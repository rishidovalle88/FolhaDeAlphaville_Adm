var menu = {};


fetch("https://rishidovalle88.github.io/FolhaDeAlphaville_Adm/assets/data/menu.json").then(
    response => response.json()
)
    .then(data => {
        menu = data
        side_root.innerHTML = HandleSideMenu();
        HandleMainMenu();
    });



const toggler = document.querySelectorAll(".menu-toggle");
toggler.forEach(item => {
    item.addEventListener("click", function () {
        if(isMobileResolution()){
            HandleMainMenu();
            return;
        }
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });
}); 


function isMobileResolution() {
    return window.innerWidth <= 768; // Defina o limite de largura para considerar como dispositivo móvel
}

// Função para alternar a classe "collapsed" no elemento com o ID "sidebar"
function toggleSidebar() {
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("collapsed");
}

// Verifica a resolução ao carregar a página
window.addEventListener("load", function () {
    if (!isMobileResolution()) {
        toggleSidebar();
    }
    else {
        const btn_menu = document.querySelector("#btn_menu");
        btn_menu.classList.toggle("d-none");
    }
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
                    <div class="row mb-4">
                        <h3>${item.system}</h3>
                        <small class="fw-ligth">O que deseja fazer?</small>
                        ${item.menus.map(submenu => {
                            return `
                                <div class="col-6 col-sm-4 col-md-3 p-2">
                                    <div class="card animation-selected">
                                        <a href="#" class="text-decoration-none" onclick="HandleSubmenus('${item.system}', ${submenu.id}, true)">
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


function HandleSubmenus(systemName, idSubmenu, isMainMenu = false) {

    const _menu = menu.data.find(item => item.system === systemName);
    const _submenu = _menu.menus.find(item => item.id === idSubmenu);


    if (!_submenu)
        return null;

    if(isMobileResolution() && !isMainMenu){
        toggleSidebar();    
    }

    const el = (
        `
            <a type="button" class="d-flex align-items-center gap-1 mb-4" onclick="HandleMainMenu()">
                <i class="fa-solid fa-chevron-left"></i>
                voltar ao menu inicial
            </a>
            <h3>${_submenu.name}</h3>
            <small>Módulo de ${_submenu.name} do sistema ${systemName}</small>
            <div class="row fade-in">        
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
            <div class="row p-2">
                <div class="card col-12 col-sm-6">                    
                    <div class="card-body d-flex flex-column gap-4">
                        <h5 class="card-title">Clientes por periodo</h5>
                        <canvas id="bar"></canvas>                    
                    </div>
                </div>
                <div class="card col-12 col-sm-6">                    
                    <div class="card-body d-flex flex-column gap-4">
                        <h5 class="card-title">Clientes por periodo</h5>
                        <canvas id="line"></canvas>                    
                    </div>
                </div>

                <div class="card col-12">                    
                    <div class="card-body d-flex flex-column gap-4">
                        <h5 class="card-title">Clientes por periodo</h5>
                        <canvas id="pie"></canvas>                    
                    </div>
                </div>
            </div>
        `
    )
    BuildRoot(el);
    ChartHandler("bar", null, "bar");
    ChartHandler("pie", null, "pie");
    ChartHandler("line", null, "line");
}

function BuildRoot(el) {
    root.innerHTML = el;
}

function ChartHandler(elId, data, type) {
    const ctx = document.getElementById(elId);

    new Chart(ctx, {
      type: type,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'white'],
        datasets: [{
          label: 'Ativos',
          data: [12, 19, 3, 5, 2, 3, 80],
          borderWidth: 1
        },{
            label: 'Inativos',
            data: [12, 19, 3, 5, 2, 3, 30],
            borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}