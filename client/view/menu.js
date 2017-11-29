function createMenu(jsonMenu){

        $.each(jsonMenu, function (i, itemMenu) {
            let btnId = "mb" + i;
            let container = "#mm" + i;
            $('#mm').append($('<a/>').attr({href: "javascript:void(0)", id: 'mb' + i}));
            let menu = $("<div/>").attr("id", btnId+"_mm");
            $("body").append(menu);

            for(let j=0; j< itemMenu.sub.length; j++){
                Items(itemMenu.sub[j], menu.get(0));
            }

            $("#mb" + i).menubutton({
                iconCls: 'icon-edit',
                menu: '#' + btnId+"_mm",
                text: itemMenu.name
            });
        });
    }
    //itens e subItens
    function Items(jsonMenu,container) {

        let div = $('<div/>');
        $(container).append(div);


        if(jsonMenu.sub && Array.isArray(jsonMenu.sub) && jsonMenu.sub.length  > 0){
            div.append($("<span/>").text(jsonMenu.name));
            let innerDiv = $("<div/>");
            div.append(innerDiv);
            for(let subitem of jsonMenu.sub ){
                Items(subitem, innerDiv.get(0));
            }
        }else{
            div.text(jsonMenu.name);
        }

    }




