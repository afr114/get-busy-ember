import Ember from 'ember';

export default Ember.Route.extend({
   model(params) {
    return this.store.findRecord('post', params.post_id);
  },

  actions:{
    update(post, params) {
        Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          post.set(key,params[key]);
        }
      });
      post.save();
      this.transitionTo('index');
    },

    destroyPost(post) {
      post.destroyRecord();
      this.transitionTo('index');
    },

    destroyComment(comment){
      comment.destroyRecord();
      this.transitionTo('post')
    },

    saveComment(params){
      var newComment = this.store.createRecord('comment', params);
      newComment.save();
      params.post.save();
      this.transitionTo('post');
      location.reload();
    },

    updateComment(comment, params) {
      Object.keys(params).forEach(function(key) {
      if(params[key]!==undefined) {
        comment.set(key,params[key]);
      }
    });
    comment.save();
    this.transitionTo('post');
    },
  }
});
