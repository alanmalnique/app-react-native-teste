export default class Functions {

    static stripHtml(html){
        const regex = /(<([^>]+)>)/ig;
        const result = html.replace(regex, '');
        return result;
    }

    static substring(text, length){
        var string = text.substr(0, length);
        if (text.length > length) {
            string += '...';
        }
        return string;
    }

    static orderDescriptionAsc( a, b ) {
        if ( a.descricao < b.descricao ){
            return -1;
        }
        if ( a.descricao > b.descricao ){
            return 1;
        }
        return 0;
    }

    static orderDescriptionDesc( b, a ) {
        if ( a.descricao < b.descricao ){
            return -1;
        }
        if ( a.descricao > b.descricao ){
            return 1;
        }
        return 0;
    }

    static orderViewAsc( a, b ) {
        if ( a.visualizacoes < b.visualizacoes ){
            return -1;
        }
        if ( a.visualizacoes > b.visualizacoes ){
            return 1;
        }
        return 0;
    }

    static orderViewDesc( b, a ) {
        if ( a.visualizacoes < b.visualizacoes ){
            return -1;
        }
        if ( a.visualizacoes > b.visualizacoes ){
            return 1;
        }
        return 0;
    }
}