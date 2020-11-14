(function(e){function t(t){for(var n,o,r=t[0],l=t[1],c=t[2],u=0,p=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&p.push(s[o][0]),s[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);d&&d(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,r=1;r<a.length;r++){var l=a[r];0!==s[l]&&(n=!1)}n&&(i.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},s={app:0},i=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var d=l;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";a("85ec")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}]},[a("el-header",[e._v("My Task List")]),a("el-main",[a("TasksView",{attrs:{allTasks:e.allTasks},on:{"delete-task":e.deleteTask,"done-task":e.doneTask}}),a("AddTask",{on:{"add-task":e.addTask}})],1)],1)],1)},i=[],o=(a("99af"),a("4de4"),a("2909")),r=(a("96cf"),a("1da1")),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",e._l(e.allTasks,(function(t){return a("Task",{key:t.id,attrs:{task:t},on:{"delete-task":function(a){return e.$emit("delete-task",t.id)},"done-task":function(a){return e.$emit("done-task",t)}}})})),1)},c=[],d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:{is_done:e.task.is_done}},[a("el-card",{staticClass:"box-card",staticStyle:{margin:"10px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v(e._s(e.task.title))]),a("el-button",{staticStyle:{float:"right",padding:"10px"},attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(t){return e.$emit("delete-task",e.task.id)}}}),a("el-checkbox",{staticStyle:{float:"right",padding:"10px"},model:{value:e.is_done,callback:function(t){e.is_done=t},expression:"is_done"}})],1),e._v(" Description: "),a("div",{staticClass:"text item"},[e._v(" "+e._s(e.task.description)+" ")])])],1)},u=[],p={name:"Task",props:["task"],computed:{is_done:{get:function(){return this.task.is_done},set:function(e){this.task.is_done=e,this.$emit("done-task",this.task)}}}},f=p,k=(a("630d"),a("2877")),h=Object(k["a"])(f,d,u,!1,null,"d02af782",null),g=h.exports,m={name:"TasksView",components:{Task:g},props:["allTasks"]},v=m,b=Object(k["a"])(v,l,c,!1,null,"6b0204de",null),_=b.exports,T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("Add Task")]),a("el-button",{staticStyle:{float:"right",padding:"3px"},attrs:{type:"text"},on:{click:e.addTask}},[e._v("Save")])],1),a("div",[a("el-input",{staticStyle:{margin:"0 0 10px 0"},attrs:{placeholder:"Title"},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),a("el-input",{attrs:{placeholder:"Description",type:"textarea"},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}})],1)]),a("el-dialog",{attrs:{title:"Invalid input",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("span",[e._v("The title field cannot be empty!")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("Ok")])],1)])],1)},y=[],x=(a("a4d3"),a("e01a"),a("498a"),{name:"AddTask",data:function(){return{title:"",description:"",dialogVisible:!1}},methods:{addTask:function(e){if(e.preventDefault(),0!=this.title.trim().length){var t={title:this.title,description:this.description,done:!1};this.$emit("add-task",t),this.title="",this.description=""}else this.dialogVisible=!0}}}),w=x,O=Object(k["a"])(w,T,y,!1,null,"93bb5cfe",null),j=O.exports,$=a("8206"),S=a.n($),V={name:"App",components:{TasksView:_,AddTask:j},methods:{addTask:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:S.a.post(t.apiUrl,e).then((function(e){console.log("Added task!"),console.log(e.data.data),t.allTasks=[].concat(Object(o["a"])(t.allTasks),[e.data.data]),t.$message({message:"Success: Added task!",type:"success"})})).catch((function(e){t.$message.error("Failed to add task."),console.log(e)}));case 1:case"end":return a.stop()}}),a)})))()},deleteTask:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.allTasks=t.allTasks.filter((function(t){return t.id!==e})),S.a.delete(t.apiUrl+e).then((function(e){console.log(e.data.message),t.$message({message:"Success: Deleted task!",type:"success"})})).catch((function(e){t.$message.error("Failed to delete task."),console.log(e)}));case 2:case"end":return a.stop()}}),a)})))()},doneTask:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:S.a.put(t.apiUrl+e.id,{is_done:e.is_done}).then((function(e){console.log("Updated task!"),console.log(e.data.data),t.$message({message:"Success: Updated task!",type:"success"})})).catch((function(e){t.$message.error("Failed to update task."),console.log(e)}));case 1:case"end":return a.stop()}}),a)})))()}},beforeCreate:function(){var e=this;this.apiUrl="/.netlify/functions/tasks/",S.a.get(this.apiUrl).then((function(t){console.log("Got tasks!"),console.log(t.data.data),e.allTasks=t.data.data,e.isLoading=!1})).catch((function(t){e.$message.error("Failed to get task data."),console.log(t)}))},data:function(){return{isLoading:!0,allTasks:[]}}},A=V,C=(a("034f"),Object(k["a"])(A,s,i,!1,null,null,null)),P=C.exports,U=a("5c96"),R=a.n(U);a("0fae");n["default"].config.productionTip=!1,n["default"].use(R.a),new n["default"]({render:function(e){return e(P)}}).$mount("#app")},"630d":function(e,t,a){"use strict";a("7fda")},"7fda":function(e,t,a){},"85ec":function(e,t,a){}});
//# sourceMappingURL=app.b7f3c7f9.js.map