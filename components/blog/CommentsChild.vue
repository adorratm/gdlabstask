<template>
  <!-- Comment Container -->
  
  <li>
  <div
    class="flex p-6 w-full bg-base-100 border my-2 rounded-md"
    :style="{ width: '100% - '+comment.indentLevel * 20 + 'px' }"
  >
    <div class="flex items-start text-center mr-4">
      <div class="bg-base-200 text-center px-1 rounded-md flex flex-col items-center">
        <button @click="likeComment(commentList,index)" class="text-right text-blue-500">
          <Icon name="mdi:plus" class="w-6 h-6 text-gray-300" size="0.5em" />
        </button>
        <div class="text-primary my-1 font-bold">{{ comment.likes }}</div>
        <button @click="dislikeComment(commentList,index)" class="text-right text-blue-500">
          <Icon name="mdi:minus" class="w-6 h-6 text-gray-300" size="0.5em" />
        </button>
      </div>
    </div>
    <div class="w-full">
      <div class="flex flex-wrap gap-3 items-start">
        <img
          :src="comment.authorAvatar"
          class="object-cover w-10 h-10 rounded-full border-2"
        />
        <h3 class="font-bold flex flex-col">
          <span class="text-[#393f46]"
            >{{ comment.author }}
            <timeago class="ml-3 font-normal text-gray-400" :datetime="comment.date"
          /></span>

          <span class="block text-sm text-gray-400 font-normal">{{ comment.email }}</span>
        </h3>

        <div class="flex ml-auto">
          <button
            v-if="comment.author !== 'adorratm'"
            @click="replyToComment(commentList,index)"
            class="text-primary font-bold flex items-center"
          >
            <Icon name="mdi:reply" size="1em" class="mr-2" />Reply
          </button>
          <button
            v-if="comment.author === 'adorratm'"
            @click="deleteComment(commentList,index)"
            class="text-error font-bold flex items-center mr-5"
          >
            <Icon name="mdi:trash" size="1em" class="mr-2" />
            Delete
          </button>
          <button
            v-if="comment.author === 'adorratm'"
            @click="editComment(commentList,index,parentIndex)"
            class="text-primary font-bold flex items-center"
          >
            <Icon name="mdi:edit" size="1em" class="mr-2" />
            Edit
          </button>
        </div>
      </div>
      <p class="text-gray-600 mt-2" v-html="formatCommentBody(comment.body)"></p>
    </div>
    
  </div>
</li>
<ol class="relative border-s border-gray-200 dark:border-gray-700 pl-5 ml-5">
  <BlogCommentsChild
        v-if="comment.children"
        
        v-for="(childComment, childIndex) in comment.children"
        :commentList="comment.children"
      :comment="childComment"
      :index="childIndex"
      @likeComment="likeComment"
      @dislikeComment="dislikeComment"
      @deleteComment="deleteComment"
      @editComment="editComment"
      @replyToComment="replyToComment"
      :newComment="newComment"
      :parentList="commentList"
      :parentIndex="index"
    />
    </ol>
  <!-- END Comment Container  -->
</template>

<script setup lang="ts">
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  newComment: {
    type: Object,
    required: true,
  },
  commentList: {
    type: Array,
    required: true,
  },
  parentList: {
      type: Array,
      default: () => [],
  },
  parentIndex: {
    type: Number,
    default: null,
  },
});

const comment = ref({ ...props.comment });

const newComment = ref(props.newComment);

const commentList = ref([...props.commentList]);

const parentList = ref([...props.parentList]);

const formatCommentBody = (comment) => {
    // Yorumda @ işaretiyle etiketlenen kullanıcıları bulma
    let splitComment = comment.split(" ");
    splitComment.forEach((word, index) => {
        if (word.startsWith("@")) {
            
            parentList.value.forEach((parentComment) => {
                if (parentComment.email.startsWith(word.slice(1))) {
                    splitComment[index] = `<a class="text-primary font-bold" href="mailto:${parentComment.email}">${word}</a>`;
                }
            });
        }
    });
    return splitComment.join(" ");
};

watchEffect(() => {
  comment.value = props.comment;
  newComment.value = props.newComment;
  commentList.value = props.commentList;
  parentList.value = props.parentList;
});

function likeComment(arr,index) {
  emit("likeComment", arr,index);
}

function dislikeComment(arr,index) {
  emit("dislikeComment", arr,index);
}

function deleteComment(arr,index) {
  emit("deleteComment", arr,index);
}

function editComment(arr,index,parentIndex) {
  console.log(arr)
  newComment.index = index;
  newComment.body = comment.value.body;
  emit("editComment",arr, index,parentIndex);
}

function replyToComment(arr,index) {
  console.log(index)
  newComment.replyTo = index;
  emit("replyToComment", arr,index);
}

const emit = defineEmits([
  "likeComment",
  "dislikeComment",
  "deleteComment",
  "editComment",
  "replyToComment",
  "commentInput",
]);
</script>
