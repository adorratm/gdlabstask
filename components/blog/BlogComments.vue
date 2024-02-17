

<template>
  <div>
    
    <ol>
      <BlogCommentsChild v-for="(comment, index) in commentList"
      :key="index" :commentList="commentList" @commentInput="focusCommentInput" :comment="comment" :index="index" @likeComment="likeComment" @dislikeComment="dislikeComment" @deleteComment="deleteComment" @editComment="editComment" @replyToComment="replyToComment" :newComment="newComment" />
    </ol>

    <div class="flex flex-wrap lg:flex-nowrap bg-base-100 p-6 rounded-md mt-6">
      <div class="mx-auto">
        <NuxtImg
          src="https://api.dicebear.com/7.x/lorelei/svg?seed=adorratm"
          alt="Adorratm"
          class="object-cover rounded-full border-2 mb-3 lg:mb-0"
          width="60"
        />
      </div>
      <div class="w-full px-5 mb-2">
        <textarea
          ref="commentInput"
          v-model="newComment.body"
          class=" rounded border leading-normal resize-none w-full h-[7.5em] py-3 px-5 font-medium placeholder-gray-400 focus:outline-none bg-white"
          name="body"
          placeholder="Add a comment..."
          required
        ></textarea>
      </div>

      <div class="mx-auto mb-2">
        <button
          @click="postComment"
          class="py-3 px-10 rounded-md text-white bg-indigo-500 font-bold"
        >
          SEND
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

const newComment = ref({ body: "", replyTo: null });
const commentList = ref([...props.comments]);

const commentInput = ref(null);

let editCommentIndex = null;
let parentIndex = null;

commentList.value.forEach((comment) => {
  comment.likes = Math.floor(Math.random() * 100); // Rastgele 0-100 arası beğeni sayısı
  comment.authorAvatar = `https://api.dicebear.com/7.x/lorelei/svg?seed=${comment.author}`; // Yorumu gönderen kullanıcının avatar URL'si
  comment.author = comment.email.split("@")[0]; // Yorumu gönderen kullanıcının adı
  comment.indentLevel = 0; // Varsayılan girinti seviyesi
  const randomMinutes = Math.floor(Math.random() * (60 * 24 * 7)); // 7 gün içinde rastgele dakika
  comment.date = new Date(Date.now() - randomMinutes * 60000); // Şu andan rastgele dakika öncesi
});

// Reorder comments by date
commentList.value.sort((a, b) => new Date(b.date) - new Date(a.date));

const likeComment = (arr,index) => {
  arr[index].likes++;
};

const dislikeComment = (arr,index) => {
  arr[index].likes--;
};

const deleteComment = (arr,index) => {
  arr.splice(index, 1);
};

const editComment = (arr,index,pIndex) => {
  // Yorumu düzenleme işlemleri
  newComment.value.body = arr[index].body;
  newComment.value.replyTo = index;
  editCommentIndex = index;
  parentIndex = pIndex;
  focusCommentInput();
};

const postComment = async () => {
  try {

    const comment = {
      body: newComment.value.body,
      author: "adorratm",
      email: "emrekilic19983@gmail.com",
      authorAvatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=adorratm`,
      date: new Date(),
      indentLevel: newComment.value.replyTo !== null ? commentList.value[newComment.value.replyTo].indentLevel + 1 : 0,
      likes: 0,
    };

    if(editCommentIndex !== null) {
      if(parentIndex !== null) {
        console.log(commentList.value[parentIndex])
        console.log(parentIndex)
        commentList.value[parentIndex].children[editCommentIndex].body = newComment.value.body;
      } else {
        commentList.value[editCommentIndex].body = newComment.value.body;
      }
      parentIndex = null;
      editCommentIndex = null;
      newComment.value.body = "";
      newComment.value.replyTo = null;
      return;
    }

    if (newComment.value.replyTo !== null) {
      if (!commentList.value[newComment.value.replyTo].children) {
        commentList.value[newComment.value.replyTo].children = [];
      }
      commentList.value[newComment.value.replyTo].children.push(comment);
    } else {
      commentList.value.unshift(comment);
    }


    newComment.value.body = "";
    newComment.value.replyTo = null;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

const replyToComment = (arr,index) => {
  newComment.value.body = `@${arr[index].author} `;
  newComment.value.replyTo = index;
  // Get the focus to the textarea
  focusCommentInput();
};

const focusCommentInput = () => {
    commentInput.value.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      commentInput.value.focus();
      // Keyboard cursor at the end of the text
      commentInput.value.setSelectionRange(commentInput.value.value.length, commentInput.value.value.length);
    }, 500);
};

</script>



