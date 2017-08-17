$(document).ready(function() {
	$(".checklist").contents().find(":checkbox").bind('change', function(){        
        val = this.checked; //<---
        $(this).parent().toggleClass('checked');
	});
	$(".checklist").contents().find(":checkbox").bind('focus', function(){        
        val = this.focused; //<---
        $('.focus').removeClass('focus');
        $(this).parent().addClass('focus');
	});
		
});