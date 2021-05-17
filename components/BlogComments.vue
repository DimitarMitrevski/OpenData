<template>
    <div class="blog-comments-wrap">
        <h4>Коментари</h4>
        <b-form @submit.prevent="submitComment" class="commentForm">
            <h5>Напиши коментар</h5>
            <b-row>
                <b-col cols="4">
                    <b-form-group
                        id="ime"
                        valid-feedback="Ви благодариме!"
                    >
                        <b-form-input id="ime" required placeholder="Внесете име" v-model="novKomentar.author" trim></b-form-input>
                    </b-form-group>
                    <b-form-file
                    v-model="file1"
                    :state="Boolean(file1)"
                    placeholder="Прикачете датотека"
                    browse-text="Пребарај"
                    @change="onFileInput($event)"
                    ></b-form-file>
                </b-col>
                <b-col cols="8">
                    <b-form-group
                        id="poraka"
                        valid-feedback="Ви благодариме!"
                    >
                        <b-form-textarea 
                            id="poraka" 
                            required placeholder="Внесете коментар" 
                            v-model="novKomentar.text" trim
                            rows="4"
                            no-resize
                            ></b-form-textarea>
                    </b-form-group>
                    <b-button class="float-right" type="submit">Објави</b-button>
                </b-col>
            </b-row>
        </b-form>
        <ul class="blog-comments list-unstyled">
            <b-media 
                class="mb-3"
                tag="li"
                v-for="(komentar, idx) in komentari" :key="idx">
                <template #aside>
                    <!-- <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img> -->
                    <b-icon variant="info" scale="3" style="margin-right: 1rem; margin-top: 1.4rem;" icon="person-circle"></b-icon>
                </template>
                <div class="header d-flex justify-content-between align-items-center w-100">
                    <a href="#!" class="mt-1 mb-1">{{komentar.author}}</a>    
                    <small class="float-right">{{$moment(Date.now()).format('l')}}</small>
                </div>
                <p class="mb-0">
                    {{ komentar.text }}
                </p>
                <img v-if="komentar.fileType == 'image'" :src="komentar.file" alt="">
                <p v-if="komentar.file && komentar.fileType !== 'image'" class="files">
                    Поставенa датотекa: <a target="_blank" :href="komentar.file">{{komentar.fileName}}</a>
                </p>
            </b-media>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file1: null,
            novKomentar: {
                author: null,
                text: null,
                file: null,
                fileType: null,
                fileExt: null,
                fileName: null
            },
            komentari: [
                {
                    author: 'Алек Горбачев',
                    text: 'Nullam lobortis, augue a dapibus varius, mi quam volutpat erat, non pretium felis nibh id nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
                }
            ]
        }
    },
    methods: {
        submitComment(){
            if(!this.novKomentar.author || !this.novKomentar.text ) return; 
            this.komentari.unshift({author: this.novKomentar.author, 
                                    text: this.novKomentar.text, 
                                    file: this.novKomentar.file,
                                    fileExt: this.novKomentar.fileExt,
                                    fileType: this.novKomentar.fileType,
                                    fileName: this.novKomentar.fileName});
            this.novKomentar.author = this.novKomentar.text = this.novKomentar.file = null;
        },
        onFileInput(event) {    	   
            const data = URL.createObjectURL(event.target.files[0]);
            const name = event.target.files[0].name;
            const ext = event.target.files[0].name.split('.')[1];
            const type = event.target.files[0].type.split('/')[0];
            this.novKomentar.file = data;
            this.novKomentar.fileName = name;
            this.novKomentar.fileExt = ext;
            this.novKomentar.fileType = type;
        },
    }
}
</script>

<style>
.blog-comments-wrap h4 { margin-bottom: 2rem; }
.blog-comments { 
    font-size: 1.15rem; 
    margin-bottom: 2rem; 
}
.blog-comments .media-body {
    background: #eee;
    padding: 1rem;
    border-radius: 1rem;
}
.blog-comments .float-right {
    color: gray
}
.blog-comments a {
    color: #17a2b8
}
.commentForm {
    padding: 1rem;
    background: #f4f4d5;
    margin-bottom: 2rem;
    border-radius: 1rem;
}
.commentForm input, .commentForm textarea, .commentForm label {
    border-color: #e7e7c6 !important;
    box-shadow: none !important;
}
.commentForm input::placeholder, .commentForm textarea::placeholder, .commentForm label > span {
    color: rgb(156, 156, 139)
}

.commentForm .custom-file-label::after, .commentForm button {
    background-color: #b9ac7e;
    color: #ffffff;
    border: none
}
.blog-comments .files {
    font-size: 14px;
    padding: .5rem;
    background: #ffffff;
    margin: 0;
    margin-top: 1rem;
    border-radius: .5rem;
}
.blog-comments img {
    margin-top: 1rem
}
</style>