/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {

    var parent_id = "partition-" + random_id();
    var id = parent_id + "-" + random_id();

    var nodes = {id: parent_id, children: []};

    
    var res = addNode(nodes, $(".partition-root").empty());
    var first_node = res[1];
    
    
    
    var highlight_line_div = $("<div/>").addClass("partition-highlight-line");
    var addedclasses = "";
    var target;
    var selected_node;
    var init_x, init_y;
    
    $(".partition-root").attr("id", parent_id).on("mousedown", ".partition-line", function(e){
        console.log("mousedown", e);

        init_x = e.screenX;
        init_y = e.screenY;
        target = $(e.target);
        addedclasses = target.attr("class");
        highlight_line_div.addClass(addedclasses);
        target.parent().append(highlight_line_div);
        selected_node = target.parent().get(0).__node__;
        console.log(selected_node);

        target.parent().get(0).onmousemove = function(e2){

            switch (getOriByClass(highlight_line_div.attr("class"))){
                case "left":
                    highlight_line_div.css("left", e2.screenX - init_x);
                    break;
                case "top":
                    highlight_line_div.css("top", e2.screenY - init_y);
                    break;
                case "right":
                    highlight_line_div.css("right", init_x - e2.screenX);
                    break;
                case "bottom":
                    highlight_line_div.css("bottom", init_y - e2.screenY);
                    break;
            }
//                    highlight_line_div.css("");
        };

    });

//    var first_part_node = {id: id, children: [], parent: nodes, left: 0, top: 0, right: 0, bottom: 0};
//    nodes.children.push(first_part_node);
//    first_node.get(0).__node__ = first_part_node;

    redraw(nodes);
    



    $(window).mouseup(function(e){
        console.log("mouseup");
        if(target){
            target.parent().get(0).onmousemove = null;
            target.parent().remove(".partition-highlight-line");
            var dev = 0;
            
            switch (getOriByClass(highlight_line_div.attr("class"))){
                case "left":
                    dev = e.screenX - init_x;
                    var parent_html = $("#"+selected_node.parent.id);
                    var res = addNode(selected_node.parent, parent_html);
                    
                    res[0].right = (parent_html.width()-dev)/parent_html.width();
                    selected_node.left = dev/parent_html.width();
                    redraw(nodes);
                    
                    break;
                case "top":
                    dev = e.screenY - init_y;
                    break;
                case "right":
                    dev = init_x - e.screenX;
                    break;
                case "bottom":
                    dev = init_y - e.screenY;
                    break;
            }
            
            highlight_line_div.removeClass(addedclasses);
            highlight_line_div.removeAttr("style");
            target = undefined;
        }
    });

    function addDragableLines(selection){
        selection.append($("<div/>").addClass("partition-line").addClass("partition-ori-left"))
                .append($("<div/>").addClass("partition-line").addClass("partition-ori-right"))
                .append($("<div/>").addClass("partition-line").addClass("partition-ori-top"))
                .append($("<div/>").addClass("partition-line").addClass("partition-ori-bottom"));
    }

    function redraw(node) {
        
        
        if(node.parent){
            var parent = $("#" + node.parent.id);
            $("#" + node.id).css({
                left: parent.width() * node.left,
                right: parent.width() * node.right,
                top: parent.height() * node.top,
                bottom: parent.height() * node.bottom
            });
        }
        
        for (var i = 0; i < node.children.length; i++) {
            redraw(node.children[i]);
        }
    }
    
    function addNode(node_data, node_selection){
        
        var id = node_data.id+"-"+random_id();
        var new_node = {id: id, children: [], parent: node_data, left: 0, top: 0, right: 0, bottom: 0};
        node_data.children.push(new_node);
                
        var html_node = $("<div/>").addClass("partition-node").attr("id", id);
        addDragableLines(html_node);
        node_selection.append(html_node);
        
        html_node.get(0).__node__ = new_node;
        
        return [new_node, html_node];
        
    }

    function random_id() {
        return Math.floor(Math.random() * 100);
    }
    function getOriByClass(class_name){
        return /partition-ori-(\w+)/g.exec(class_name)[1];
    }
});
