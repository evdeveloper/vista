$(document).ready(function() {
	function arrayObjectIndexOf(myArray, property, searchTerm) {
		for(let i = 0, len = myArray.length; i < len; i++) {
			if (myArray[i][property] === searchTerm) 
				return i;
		}
		return -1;
	}
	function birthDateToAge(birthDate) {
		birthDate = new Date(birthDate);
		var now = new Date(),
		age = now.getFullYear() - birthDate.getFullYear();
		return now.setFullYear(1972) < birthDate.setFullYear(1972) ? age - 1 : age;
	}
	var current, old;
	$.getJSON('./json/current.json', function(data){
		current = data;
		$('.wrapper .multiple .pager .control').eq(0).find('.count').text('('+current.length+')');
		$.each(current, function(key, val){
			var table = '<tr><td>'+val.historyNumber+'</td><td>'+val.lastName+' '+val.firstName+' '+val.patrName+'</td><td>'+val.bedNumber+'</td></tr>';
			$('.wrapper .multiple .groups .group.current table').append(table);
		});
	});
	$.getJSON('./json/old.json', function(data){
		old = data;
		$('.wrapper .multiple .pager .control').eq(1).find('.count').text('('+old.length+')');
		$.each(old, function(key, val){
			var table = '<tr><td>'+val.historyNumber+'</td><td>'+val.lastName+' '+val.firstName+' '+val.patrName+'</td><td>'+val.cause+'</td></tr>';
			$('.wrapper .multiple .groups .group.old table').append(table);
		});
	});
	$('.wrapper .multiple .groups .group table').on('click', 'tr', function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		var name = $(this).find('td').eq(1).text();
		var age = '';
		var historyNumber = parseInt($(this).find('td').eq(0).text());
		var data;
		var group = $(this).parents('.group');
		if (group.hasClass('current')) {
			data = current;
		}
		else if (group.hasClass('old')) {
			data = old;
		}
		let index = arrayObjectIndexOf(data, 'historyNumber', historyNumber);
		var diagnosis = data[index].diagnosis;
		var birthDate = data[index].birthDate;
		var age = birthDateToAge(birthDate);
		$(this).parents('.wrapper').find('.single .items .item .value').eq(0).text(name);
		$(this).parents('.wrapper').find('.single .items .item .value').eq(1).text(age);
		$(this).parents('.wrapper').find('.single .items .item .value').eq(2).text(diagnosis);
	});
	$('.wrapper .multiple .pager .control').on('click', function () {
		if ($(this).hasClass('active')) {
			return false;
		}
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		var group = $(this).parents('.multiple').find('.groups .group');
		group.removeClass('active');
		group.eq($(this).index()).addClass('active');
		group.find('table tr').removeClass('active');
		$(this).parents('.wrapper').find('.single .items .item').find('.value').text('');
	});
});