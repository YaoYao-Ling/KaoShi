<template>
    <div class="create-test-wrap">
        <h2>创建试卷</h2>
        <div class="create-test-content">
            <button class="add_questions">添加新题</button>
          
            <div class="questions-wrap" v-if="exam_questions.questions">
                <h2>{{exam_questions.title}}</h2>
                <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
                <div ref="questions" @click="del($event, index)" class="div_questions" v-for="(item, index) in exam_questions.questions" :key="index">
                    <h4>{{index + 1}}: {{item.title}} <span class="del">删除</span></h4>
                </div>
            </div>
            <button class="create_test" @click="createTest">创建试卷</button>
        </div>    
        <div class="markdown">
            <mavon-editor 
            v-model="answer1"
            @change="changeAnswer1"
            />
        </div>
        <div class="markdown">
            <mavon-editor 
            v-model="answer2"
            @change="changeAnswer2"
            />
        </div>
        <div class="markdown">
            <mavon-editor 
            v-model="answer3"
            @change="changeAnswer3"
            />
        </div>
    </div>
</template>

<script>
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'    
import { mapState, mapActions } from 'vuex'


export default {
    data() {
        return {
            // 输入的markdown
            answer1: '',
            answer2: '',
            answer3: '',
        }
    },
    components: {
        mavonEditor,
    },
    computed: {
        ...mapState({
            exam_questions: state => state.exam_management.exam_questions
        })
    },
    methods: {
        // 创建试卷
        createTest() {
            if (!this.exam_questions.exam_exam_id && !this.exam_questions.user_id && !this.exam_questions.subject_id) {
                alert('请先添加考试!')
                return;
            }
            const question_ids = JSON.stringify([this.exam_questions.exam_exam_id, this.exam_questions.user_id, this.exam_questions.subject_id].join(','))

            this.update_exam({question_ids})
            this.$router.push('/example/list')
        },
        // 删除
        del(e, index) {
            if (e.target.innerText === '删除') {
                this.$refs.questions[index].remove()
            }
        },
        // 所有操作都会被解析重新渲染
        changeAnswer1(value, render){
            this.$refs.questions[0].innerHTML += render
            // console.log('changeAnswer1------',render)
            // render 为 markdown 解析后的结果[html]
        },
        // 所有操作都会被解析重新渲染
        changeAnswer2(value, render){
             this.$refs.questions[1].innerHTML += render
            // console.log('changeAnswer2------',render)
            // render 为 markdown 解析后的结果[html]
        },
        // 所有操作都会被解析重新渲染
        changeAnswer3(value, render){
             this.$refs.questions[2].innerHTML += render
            // console.log('changeAnswer3------',render)
            // render 为 markdown 解析后的结果[html]
        },
        ...mapActions({
            // 更新试卷接口
            update_exam: 'exam_management/update_exam',
        }),
    },
    mounted() {
        // 传入 markdown中
        this.exam_questions.questions && this.exam_questions.questions.map((item, index) => {
            this[`answer${[index + 1]}`] = item.questions_stem
        })
    }

}
</script>

<style lang="scss" scoped>
.create_test {
    bottom: 100px;
    position: absolute;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    height: 32px;
    padding: 0 40px!important;
    border-radius: 4px!important;
    border: 0!important;
    font-size: 14px!important;
    color: #fff!important;
    background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
}
.del {
    float: right;
    color: #0139FD;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
}
.questions-wrap {
    min-height: 980px;
    margin: auto;
    padding: 40px;
    text-align: center;
    position: relative;
    & > p {
        margin-bottom: 1em;
    }
    & > h2 {
        font-size: 1.5em;
        margin-top: 0;
        margin-bottom: 0.5em;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
    }
}
>>> pre{
    display: block;
    padding: 1em;
    overflow: auto;
    line-height: 1.3;
    max-height: 35em;
    color: #657b83;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8AgMAAABHkjHhAAAACVBMV…v3iO9zG/UOphyPeinPl1J8Gtaa7xPTa/Dk+RIs4deMvwGvcGsmsCvJ0AAAAABJRU5ErkJggg==) #f6f6f6;
    background-size: 30px 30px;
}
.markdown {
    position: fixed;
    left: 100%;
    top: 100%;
}
.div_questions {
    text-align: left;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    & > h4 {
        margin-top: 0;
        margin-bottom: 0.5em;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
    }
    >>> & > p {
        margin: 1.5em 0;
        white-space: pre-wrap;
    }

    >>> & > p:last-child {
        margin: 0;
    }
}
.add_questions {
    line-height: 1.499;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 2px;
    height: 32px;
    user-select: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border-color: #d9d9d9;
    &:hover {
        border-color: #295eff;
        color: #295eff;
    }
}
.create-test-content {
    background: rgb(255, 255, 255);
    padding: 24px 24px 54px 24px;
    margin: 0px 0px 20px;
    border-radius: 10px;
}
.create-test-wrap {
    padding: 0px 24px 24px;
    background: #f0f2f5;
    & > h2 {
        padding: 20px 0px;
        margin-top: 10px;
        font-size: 20px;
    }
}
</style>