//this arrary use to store instance
var numarguments = [];
//handle data
(function($){
	$.fn.createrNode = function(node,data){
		var menu_elm;
		this.uni=node;
		var position=node.offset();
		var mar=position.top+node.height()+20;
		var marleft=position.left;
		this.mar = mar;
		this.marleft = marleft;
		var me = this;
		var numul = 0;

		var toggle_menu = function(event){
			
			for(var i = 0 ; i < numarguments.length;i++){
				if(numarguments[i]!= me){
					
					numarguments[i].hideorshow(true);
				}
			}
			me.hideorshow(menu_elm.hasClass("menu_content_show"));
			
			event.stopPropagation();
		}
		//点击页面其他地方隐藏菜单
		var otherhtmlhide = function(event){
			for(var i = 0;i < numarguments.length;i++){
				if(numarguments[i].uni.attr("id") != event.target.getAttribute("id")){
					for(var i = 0 ; i < numarguments.length;i++){
					
						numarguments[i].hideorshow(true);
					}
					
				}
			}
		
		}
		this.menu_elm = menu_elm = $("<div></div>").addClass("menu_content_hide").addClass("menu_container");
		menu_elm.css({"top":mar,"left":marleft});
		node.after(menu_elm);
		node.on("click", toggle_menu);
		$(window).on("click",otherhtmlhide);
		
		
		var section=$("<section></section>").addClass("list_top").attr("id","list_top_1");
		var ur_1=$("<ul></ul>").addClass("list_ul");

		
		menu_elm.append(section);
		//get the data from argument
		var getData = function(node){
			var datalength = node.root.length;
			var object = eval(node);
			var hh2 = $("<h2></h2>").text(object.root[datalength-1].name1);
			section.prepend(hh2);

			if(datalength != 0){
				section.append($("<ul></ul>").addClass("list_ul"));
				
				for(var i = 0; i<datalength; i++){
					var list1 = $("<li></li>").addClass("list_top_li");
					if(object.root[i].name1 == "-"){
						var a1 = $("<a></a>").addClass("list_mune_a").css("width","0").text("");
						section.append($("<ul></ul>").addClass("list_ul"));
						numul +=1;
						
					}
					else{

						var a1 = $("<a></a>").addClass("list_mune_a").attr("href","http://"+object.root[i].url).text(object.root[i].name1);
					}
						
						section.find("ul").eq(numul).append(list1);
						list1.append(a1);
					
				}
				
			}
		}
		
		section.append(ur_1);
		if (menu_elm.text() == ""){
			getData(data);
		} else {
			menu_elm.empty();
		}
		return this;
	};
})(jQuery);
//use this function to binding data
(function($){
	$.fn.menu = function(data){
		
		numarguments.push(this.createrNode(this,data));
		return this;
		
	}
})(jQuery);
//this function use to hide or show the menu
(function($){
	$.fn.hideorshow = function(hide){
		
		if(!hide){
				this.menu_elm.removeClass("menu_content_hide").addClass("menu_content_show");
				this.menu_elm.css({"top":this.mar,"left":this.marleft});
				
				//menu_elm=$("<div></div>").addClass("menu_content_1").attr("id","list_mune");
			} 
			else {
				this.menu_elm.removeClass("menu_content_show").addClass("menu_content_hide");
				this.menu_elm.css({"top":this.mar,"left":this.marleft});
			}
		return this;
	}
})(jQuery);