exports.config = {
    name: 'Reportero X',

    facebook: {
        secret: "90fea6f6c8981cd993c660ae74075e18",
        appId: "323755004379477",
        profileUrl: "http://www.facebook.com/ExtraEc"
    },

    facebookDev: {
        secret: "5953d1b89ba48b8a0f99ba9d6529e1c4",
        appId: "284959041622591",
        profileUrl: "http://www.facebook.com/ExtraEc"
    },

    webServices: {

        MasVisitadasSemana: {
            url: "http://services.extra.ec/WsReporteroX/ws/ws.aspx",
            params: [
                {operation: "semana"}
            ]

        },

        MasPopulares: {
            url: "http://services.extra.ec/WsReporteroX/ws/ws.aspx",
            params: [
                {operation: "populares"}
            ]
        },

        NoticiasPorPagina: {
            url: "http://services.extra.ec/WsReporteroX/ws/ws.aspx",
            params: [{operation: "noticiasPorPagina"},
                     {page: "1"}]
        },
        NoticiasPorId: {
            url : "http://services.extra.ec/WsReporteroX/ws/ws.aspx",
            params: [ {operation: "noticiasPorId"},
                      {ID: '1'}]
        },
        fotosPortada: {
            url: "http://services.extra.ec/WsReporteroX/ws/ws.aspx",
            params: [{operation: "fotosPortada"}]
        },
        proximoConcurso: {
            url: "http://services.extra.ec/WsReporteroX/ws/ws.aspx?operation=proximoConcurso"
        }

    },
    links: {
        urlMicrositio: "http://reporterox.graficosnacionales.com/#seccion-concurso"
    }
};
