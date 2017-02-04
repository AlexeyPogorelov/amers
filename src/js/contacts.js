(function() {

    function jsonToList($el, json, type) {
        // configure type
        var i = 0;
        $el.empty();
        json = json.split(',');
        if (!type) {
            for (i = 0; i < json.length; i++) {
                $('<li>').text(
                    $.trim(json[i])
                ).appendTo($el);
            }
        } else if (type === 'email') {
            for (i = 0; i < json.length; i++) {
                $('<li>').text(
                    $.trim(json[i])
                ).appendTo($el);
            }
        } else if (type === 'phone') {
            for (i = 0; i < json.length; i++) {
                $('<li>').text(
                    $.trim(json[i])
                ).appendTo($el);
            }
        } else if (type === 'skype') {
            for (i = 0; i < json.length; i++) {
                $('<li>').text(
                    $.trim(json[i])
                ).appendTo($el);
            }
        }
    }

    function set($el, data) {
        $el.text(data);
    }

    function moveMap(lat, lng) {}

    var buttons = $('.js-button-map-trigger'),
        dataName = $('.js-button-map-name'),
        dataAddress = $('.js-button-map-address'),
        dataCellphones = $('.js-button-map-cellphones'),
        dataEmails = $('.js-button-map-emails');
    buttons.on('click', function() {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');

        set(dataName, $this.data('name'));
        set(dataAddress, $this.data('address'));
        jsonToList(dataCellphones, $this.data('cellphones'));
        jsonToList(dataEmails, $this.data('emails'));
    });

})();
