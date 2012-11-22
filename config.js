exports.config = {
    name: 'Reportero X',

    facebook: {
        secret: "",
        appId: "",
        profileUrl: "http://www.facebook.com/ExtraEc"
    },

    facebookDev: {
        secret: "",
        appId: "",
        profileUrl: "http://www.facebook.com/ExtraEc"
    },

    webServices: {

        MasVisitadasSemana: {
            url: "http://services.extra.ec/",
            params: [
                {operation: "semana"}
            ]

        },

        MasPopulares: {
            url: "http://services.extra.ec/",
            params: [
                {operation: "populares"}
            ]
        },

        NoticiasPorPagina: {
            url: "http://services.extra.ec/",
            params: [{operation: "noticiasPorPagina"},
                     {page: "1"}]
        },
        NoticiasPorId: {
            url : "http://services.extra.ec/",
            params: [ {operation: "noticiasPorId"},
                      {ID: '1'}]
        },
        fotosPortada: {
            url: "http://services.extra.ec/",
            params: [{operation: "fotosPortada"}]
        },
        proximoConcurso: {
            url: "http://services.extra.ec/"
        }

    },
    links: {
        urlMicrositio: "http://reporterox.graficosnacionales.com"
    }
};
