import { db } from '~/plugins/firebase'

export const state = () => ({
    blogPosts: [],
    blogPost: {}
})

export const mutations = {
    setAllBlogPosts(state, payload) {
        state.blogPosts = payload;
    },
    setBlogPost(state, payload){
        state.blogPost = payload
    }
}

export const actions = {
    async getAllBlogPosts(state) {
        let allBlogPosts = [];
        await db.collection('blogPosts').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                allBlogPosts.push(doc.data())
            })
        });
        state.commit('setAllBlogPosts', allBlogPosts);
    },
    async getSinglePost(state, payload){
        let postC = {};
        await db.collection('blogPosts').where('title','==', payload).get().then(snapshot => {
            snapshot.forEach(doc=>{
                postC = doc.data()
            })
        })
        state.commit('setBlogPost', postC);
    }
}

export const getters = {
    getAllBlogs (state) { return state.blogPosts; }
}