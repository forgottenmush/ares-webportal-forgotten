import Controller from '@ember/controller';
import AuthenticatedController from 'ares-webclient/mixins/authenticated-controller';
import { inject as service } from '@ember/service';

export default Controller.extend(AuthenticatedController, {
    ajax: service(),
    flashMessages: service(),
    title: '',
    date: '',
    time: '',
    description: '',
    
    resetForm: function() {
        this.set('title', '');
        this.set('date', '');
        this.set('time', '');
        this.set('description', '');
    },
    
    actions: {
        changeDate: function(date) {
            let formatted_date = moment(date).format(this.get('model.game.date_entry_format'));
            this.set('date', formatted_date);  
        },
        create: function() {
            let aj = this.get('ajax');
            aj.queryOne('createEvent', { title: this.get('title'), 
               date: this.get('date'),
               time: this.get('time'),
               description: this.get('description') })
            .then( (response) => {
                if (response.error) {
                    return;
                }
                this.transitionToRoute('events.event',                          
                          response.id);
                this.get('flashMessages').success('Event added!');
            })
            .catch((response) => {
                this.get('flashMessages').danger(response);
            });
        }
    }
});