"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[530],{3419:function(e,t,n){n.d(t,{UL:function(){return s},Ve:function(){return i},ow:function(){return u},rk:function(){return a}});var r=n(687).h.injectEndpoints({endpoints:function(e){return{authUser:e.query({query:function(){return{url:"user/authUser",credentials:"include"}},providesTags:["AuthUser"]}),publicUser:e.query({query:function(e){return{url:"user/".concat(e),credentials:"include"}}}),updateAuthUser:e.mutation({query:function(e){return{url:"user/authUser/update",method:"PATCH",body:e,credentials:"include"}},invalidatesTags:["AuthUser"]})}},overrideExisting:!1}),s=r.useAuthUserQuery,i=r.useUpdateAuthUserMutation,u=r.usePublicUserQuery,a=function(){return r.useAuthUserQuery(void 0,{selectFromResult:function(e){return{authUser:e.data}}})}},6383:function(e,t,n){n.d(t,{Ji:function(){return d},SP:function(){return l},ZS:function(){return m},bl:function(){return o},w0:function(){return x},yq:function(){return c}});var r=n(4942),s=n(1413),i=n(4165),u=n(5861),a=n(687).h.injectEndpoints({endpoints:function(e){return{issues:e.query({query:function(e){var t=e.projectId,n=e.userId;return{url:"project/".concat(t,"/issues").concat(n?"?userId="+n:""),credentials:"include"}},providesTags:["Issues"]}),createIssue:e.mutation({query:function(e){return{url:"issue/create",method:"POST",body:e,credentials:"include"}},invalidatesTags:["Issues"]}),updateIssue:e.mutation({query:function(e){var t=e.id,n=e.body;return{url:"issue/".concat(t,"/update"),method:"PATCH",body:n,credentials:"include"}},invalidatesTags:["Issues"]}),deleteIssue:e.mutation({query:function(e){var t=e.issueId,n=e.projectId;return{url:"issue/".concat(t,"/delete"),method:"DELETE",body:{projectId:n},credentials:"include"}},invalidatesTags:["Issues"]}),reorderIssues:e.mutation({query:function(e){return{url:"issue/reorder",method:"PUT",body:e,credentials:"include"}},invalidatesTags:["Issues"],onQueryStarted:function(e,t){return(0,u.Z)((0,i.Z)().mark((function n(){var r,s,u;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=e.s,s=e.d,u=e.projectId,(0,t.dispatch)(a.util.updateQueryData("issues",{projectId:u},(function(e){return p(e,{s:{sId:r.sId,index:r.order-1},d:{dId:s.dId,index:s.newOrder-1}})})));case 3:case"end":return n.stop()}}),n)})))()}})}},overrideExisting:!1}),d=a.useIssuesQuery,c=a.useCreateIssueMutation,o=a.useUpdateIssueMutation,l=a.useDeleteIssueMutation,m=a.useReorderIssuesMutation,x=function(e){var t=e.listId,n=e.projectId;return a.useIssuesQuery({projectId:n},{selectFromResult:function(e){var n=e.data;return{issues:n?n[t]:[]}}})},p=function(e,t){var n,i=t.s,u=t.d,a=e[i.sId].slice(0),d=e[u.dId].slice(0),c=a.splice(i.index,1)[0];return(i.sId===u.dId?a:d).splice(u.index,0,c),(0,s.Z)((0,s.Z)({},e),{},(n={},(0,r.Z)(n,u.dId,d),(0,r.Z)(n,i.sId,a),n))}},5918:function(e,t,n){n.d(t,{LP:function(){return o},Nj:function(){return c},PG:function(){return l},RN:function(){return d},Rn:function(){return a},i7:function(){return u}});var r=n(4165),s=n(5861),i=n(687).h.injectEndpoints({endpoints:function(e){return{lists:e.query({query:function(e){return{url:"project/".concat(e,"/lists"),credentials:"include"}},providesTags:["Lists"]}),createList:e.mutation({query:function(e){return{url:"list/create",method:"POST",body:e,credentials:"include"}},invalidatesTags:["Lists"]}),updateList:e.mutation({query:function(e){var t=e.listId,n=e.body;return{url:"list/".concat(t,"/update"),method:"PATCH",body:n,credentials:"include"}},invalidatesTags:["Lists"]}),deleteList:e.mutation({query:function(e){var t=e.listId,n=e.projectId;return{url:"list/".concat(t,"/delete"),method:"DELETE",body:{projectId:n},credentials:"include"}},invalidatesTags:["Lists"]}),reorderLists:e.mutation({query:function(e){return{url:"list/reorder",method:"PUT",body:e,credentials:"include"}},invalidatesTags:["Lists"],onQueryStarted:function(e,t){return(0,s.Z)((0,r.Z)().mark((function n(){var s,u,a;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:s=e.order,u=e.newOrder,a=e.projectId,(0,t.dispatch)(i.util.updateQueryData("lists",a,(function(e){return m(e,{s:s-1,d:u-1})})));case 3:case"end":return n.stop()}}),n)})))()}})}},overrideExisting:!1}),u=i.useListsQuery,a=i.useCreateListMutation,d=i.useUpdateListMutation,c=i.useDeleteListMutation,o=i.useReorderListsMutation,l=function(e){return i.useListsQuery(e,{selectFromResult:function(e){return{lists:e.data}}})};function m(e,t){var n=t.s,r=t.d,s=e.slice(0),i=s.splice(n,1)[0];return s.splice(r,0,i),s}},429:function(e,t,n){n.d(t,{Rw:function(){return s},ad:function(){return a},er:function(){return i},xH:function(){return u}});var r=n(687).h.injectEndpoints({endpoints:function(e){return{members:e.query({query:function(e){return{url:"project/".concat(e,"/members"),credentials:"include"}},providesTags:["Members"]}),removeMember:e.mutation({query:function(e){return{url:"member/remove",method:"DELETE",body:e,credentials:"include"}},invalidatesTags:["Members"]}),addMember:e.mutation({query:function(e){return{url:"member/add",method:"PUT",body:e,credentials:"include"}},invalidatesTags:["Members"]})}},overrideExisting:!1}),s=r.useMembersQuery,i=r.useRemoveMemberMutation,u=r.useAddMemberMutation,a=function(e){return r.useMembersQuery(e,{selectFromResult:function(e){return{members:e.data}}})}},8816:function(e,t,n){n.d(t,{V:function(){return r},t:function(){return s}});var r=[{text:"Task",icon:"/assets/task.svg",value:0},{text:"Bug",icon:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iI0U1NDkzQSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSI1IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",value:1},{text:"Review",icon:"/assets/review.svg",value:2}],s=[{text:"Lowest",icon:"/assets/lowest.svg",value:0},{text:"Low",icon:"/assets/low.svg",value:1},{text:"Medium",icon:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAxOSAxOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjEuNSIgcng9IjAuNzUiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAtMC4wOTQyNTMyIDAuOTk1NTQ4IDIuMTQxMzggMTIpIiBmaWxsPSIjRkZBQjAwIi8+CjxyZWN0IHdpZHRoPSIxNSIgaGVpZ2h0PSIxLjUiIHJ4PSIwLjc1IiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgLTAuMDk0MjUzMiAwLjk5NTU0OCAyLjE0MTM4IDUpIiBmaWxsPSIjRkZBQjAwIi8+Cjwvc3ZnPgo=",value:2},{text:"High",icon:"/assets/high.svg",value:3},{text:"Highest",icon:"/assets/highest.svg",value:4}]},2530:function(e,t,n){n.r(t),n.d(t,{default:function(){return q}});var r=n(1413),s=n(9439),i=n(2791),u=n(6871),a=n(6383),d=n(5918),c=n(3122),o=n(184),l=function(e){var t=e.children,n=e.className,s=e.droppableId,i=e.type,u=e.direction;return(0,o.jsx)(c.bK,{direction:u,type:i,droppableId:s,children:function(e){return(0,o.jsxs)("div",(0,r.Z)((0,r.Z)({className:n,ref:e.innerRef},e.droppableProps),{},{children:[t,e.placeholder]}))}})},m=function(e){var t=e.index,n=e.draggableId,s=e.isDragDisabled,i=e.className,u=e.children;return(0,o.jsx)(c._l,{index:t,draggableId:n,isDragDisabled:s,children:function(e){var t=e.innerRef,n=e.dragHandleProps,s=e.draggableProps;return(0,o.jsx)("div",(0,r.Z)((0,r.Z)((0,r.Z)({className:i,ref:t},n),s),{},{children:u}))}})},x=n(8816),p=n(429),I=n(4942),f=n(5987),b=n(9637),h=n(9333),j=["id","userId"],g=function(e){var t=e.members,n=e.assignees,s=t.reduce((function(e,t){t.id;var n=t.userId,s=(0,f.Z)(t,j);return(0,r.Z)((0,r.Z)({},e),{},(0,I.Z)({},n,s))}),{});return(0,o.jsx)(b.xjn,{children:(0,o.jsx)(h.HE,{size:"sm",children:n.map((function(e){var t=e.id,n=e.userId,r=s[n];return r?(0,o.jsx)(h.qE,{name:r.username,src:r.profileUrl},t):null}))})})},v=(0,i.memo)(g),y=(0,i.lazy)((function(){return n.e(224).then(n.bind(n,5224))})),Z=(0,i.lazy)((function(){return Promise.all([n.e(812),n.e(59)]).then(n.bind(n,5059))})),D=function(e){var t=e.listId,n=e.listIdx,r=e.idx,a=e.summary,d=e.id,c=e.type,l=e.priority,I=e.assignees,f=e.isDragDisabled,b=(0,i.useState)(!1),h=(0,s.Z)(b,2),j=h[0],g=h[1],D=Number((0,u.UO)().projectId),N=(0,p.ad)(D).members,M=x.t[l],w=M.icon,T=M.text;return N?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(m,{className:"mb-2 w-full rounded-sm bg-c-1 p-2 shadow-issue hover:bg-c-4",index:r,draggableId:"issue-"+d,isDragDisabled:f,children:(0,o.jsxs)("div",{onClick:function(){return g(!0)},children:[(0,o.jsx)("span",{className:"",children:a}),(0,o.jsxs)("div",{className:"flex items-center justify-between mt-2",children:[(0,o.jsxs)("div",{className:"flex items-center gap-3",children:[(0,o.jsx)("img",{className:"w-[18px] h-[18px]",src:x.V[c].icon,alt:x.V[c].text}),(0,o.jsx)("img",{className:"w-[18px] h-[18px]",src:w,alt:T})]}),(0,o.jsx)(v,{assignees:I,members:N})]})]})}),j&&(0,o.jsx)(i.Suspense,{children:(0,o.jsx)(y,{children:Z,onClose:function(){return g(!1)},issue:{listId:t,listIdx:n,idx:r}})})]}):null},N=n(2711),M=(0,i.lazy)((function(){return n.e(781).then(n.bind(n,6781))})),w=function(e){var t=e.idx,n=e.name,u=e.id,a=e.projectId,c=e.issues,x=e.isDragDisabled,p=(0,d.Nj)(),I=(0,s.Z)(p,1)[0],f=(0,i.useState)(n),b=(0,s.Z)(f,2),h=b[0],j=b[1],g=(0,i.useState)(!1),v=(0,s.Z)(g,2),y=v[0],Z=v[1],w=(0,i.useState)(!1),T=(0,s.Z)(w,2),C=T[0],S=T[1],L=(0,d.RN)(),P=(0,s.Z)(L,1)[0];return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(m,{className:"w-[clamp(16rem,18rem,20rem)]",index:t,draggableId:"list-"+u,isDragDisabled:x,children:(0,o.jsxs)("div",{className:"relative mr-3 bg-c-2 p-3 shadow-list text-c-5",children:[(0,o.jsxs)("div",{className:"mb-4 text-[15px] flex justify-between items-center",children:[(0,o.jsxs)("div",{className:"flex item-center",children:[(0,o.jsx)("div",{className:"relative",children:y?(0,o.jsx)("input",{value:h,onChange:function(e){return j(e.target.value)},autoFocus:!0,className:"bg-c-2 pl-2 w-36 border-[1.5px] text-[15px] focus:border-chakra-blue outline-none"}):(0,o.jsx)("span",{className:"pl-2 block font-medium border-[1.5px] border-transparent",children:h})}),(0,o.jsx)("span",{className:"mx-2 text-gray-500",children:"|"}),(0,o.jsx)("span",{className:"font-bold text-c-4 pt-[1px]",children:c?c.length:0})]}),(0,o.jsxs)("div",{className:"flex gap-2",children:[y&&(0,o.jsx)("button",{onClick:function(){return S(!0)},title:"Delete",className:"icon-btn ml-5 hover:bg-c-3",children:(0,o.jsx)(N.JO,{icon:"bx:trash",className:"text-red-500"})}),(0,o.jsx)("button",{onClick:function(){y&&h!==n&&P({listId:u,body:{projectId:a,name:h}}),Z((function(e){return!e}))},title:y?"Save":"Edit",className:"icon-btn hover:bg-c-3",children:(0,o.jsx)(N.JO,{icon:y?"charm:tick":"akar-icons:edit"})})]})]}),(0,o.jsx)(l,{className:"min-h-[3rem]",type:"issue",droppableId:"list-"+u,children:null===c||void 0===c?void 0:c.map((function(e,n){return(0,o.jsx)(D,(0,r.Z)((0,r.Z)({isDragDisabled:x,listIdx:t,idx:n},e),{},{listId:u}),e.id)}))})]})}),C&&(0,o.jsx)(i.Suspense,{children:(0,o.jsx)(M,{onClose:function(){return S(!1)},onSubmit:function(){return I({listId:u,projectId:a})}})})]})},T=function(e){var t=e.lists,n=e.issues,i=e.isDragDisabled,m=(0,d.LP)(),x=(0,s.Z)(m,1)[0],p=(0,a.ZS)(),I=(0,s.Z)(p,1)[0],f=(0,d.Rn)(),b=(0,s.Z)(f,1)[0],h=Number((0,u.UO)().projectId);if(!t)return null;return(0,o.jsx)("div",{className:"grow px-10 min-w-max flex items-start",children:(0,o.jsxs)(c.Z5,{onDragEnd:function(e){var r=e.type,s=e.source,i=e.destination;t&&n&&i&&(s.droppableId!==i.droppableId||s.index!==i.index)&&("list"===r?x({id:t[s.index].id,order:s.index+1,newOrder:i.index+1,projectId:h}):I({id:n[C(s)][s.index].id,s:{sId:C(s),order:s.index+1},d:{dId:C(i),newOrder:i.index+1},projectId:h}))},children:[(0,o.jsx)(l,{type:"list",className:"flex items-start",droppableId:"board-central",direction:"horizontal",children:t.map((function(e,t){return(0,o.jsx)(w,(0,r.Z)({idx:t,issues:null===n||void 0===n?void 0:n[e.id],isDragDisabled:i},e),e.id)}))}),(0,o.jsxs)("button",{onClick:function(){b({projectId:h})},className:"bg-c-2 text-c-5 hover:bg-c-6 active:bg-blue-100 py-3 px-14 rounded-md flex items-center gap-5",children:["Create a list ",(0,o.jsx)(N.JO,{icon:"ant-design:plus-outlined"})]})]})})},C=function(e){return+e.droppableId.split("-")[1]},S=n(426),L=n(824),P=n(4190),k=n(3419),A=(0,i.lazy)((function(){return n.e(224).then(n.bind(n,5224))})),U=(0,i.lazy)((function(){return Promise.all([n.e(812),n.e(970)]).then(n.bind(n,5970))}));var E=function(e){var t=e.issueQueryData.userId,n=e.setIssueQueryData,r=e.projectId,a=e.isEmpty,d=e.setIsDragDisabled,c=(0,p.Rw)(r),l=c.data,m=c.error,x=(0,k.UL)().data,I=(0,i.useState)(!1),f=(0,s.Z)(I,2),j=f[0],g=f[1],v=(0,S.pm)();if(m&&401===m.status)return(0,o.jsx)(u.Fg,{to:"/login"});if(!x||!l)return null;var y=function(e){return function(){n(e),d(!!e.userId)}};return(0,o.jsx)("div",{className:"mb-8 flex min-w-fit items-center px-10 text-c-5",children:(0,o.jsxs)(b.xjn,{children:[(0,o.jsxs)(L.BZ,{size:"sm",minW:160,w:160,children:[(0,o.jsx)(L.Z8,{children:(0,o.jsx)(N.JO,{width:20,icon:"ant-design:search-outlined"})}),(0,o.jsx)(L.II,{size:"sm",placeholder:"Search issues"})]}),(0,o.jsx)(h.HE,{ml:6,mr:4,children:null===l||void 0===l?void 0:l.map((function(e){var n=e.id,r=e.profileUrl,s=e.username,i=e.userId;return(0,o.jsx)(h.qE,{name:s,title:s,src:r,h:"43px",w:"43px",cursor:"pointer",transitionDuration:".2s",borderColor:i===t?"blue":void 0,_hover:{transform:"translateY(-6px)"},onClick:y({userId:i})},n)}))}),(0,o.jsx)("button",{className:"btn-crystal",onClick:y({userId:x.id}),children:"Only my issues"}),(0,o.jsx)(P.iz,{my:1,h:6,orientation:"vertical"}),t&&(0,o.jsx)("button",{className:"btn-crystal",onClick:y({}),children:"Clear all"}),(0,o.jsx)("button",{onClick:function(){if(a)return v(Q);g(!0)},className:"btn ml-5",children:"Create an issue"}),j&&!a&&(0,o.jsx)(i.Suspense,{children:(0,o.jsx)(A,{children:U,onClose:function(){return g(!1)}})})]})})},Q={title:"Please create a list before creating an issue",position:"top-right",duration:4e3,isClosable:!0},q=function(){var e=Number((0,u.UO)().projectId),t=(0,i.useState)({}),n=(0,s.Z)(t,2),c=n[0],l=n[1],m=(0,d.i7)(e),x=m.data,p=m.error,I=(0,i.useState)(!1),f=(0,s.Z)(I,2),b=f[0],h=f[1],j=(0,a.Ji)((0,r.Z)({projectId:e},c),{refetchOnMountOrArgChange:!0}),g=j.data,v=j.error;return p&&v?401===p.status||401===v.status?(0,o.jsx)(u.Fg,{to:"/login"}):(0,o.jsx)("div",{className:"grow grid place-items-center h-full text-xl",children:"You are not part of this project \u261d"}):(0,o.jsxs)("div",{className:"flex grow flex-col",children:[(0,o.jsx)("div",{className:"mx-10 mt-6",children:(0,o.jsx)("h1",{className:"mb-4 text-xl font-semibold text-c-text",children:"Kanban Board"})}),(0,o.jsx)(E,{isEmpty:0===(null===x||void 0===x?void 0:x.length),issueQueryData:c,setIssueQueryData:l,projectId:e,setIsDragDisabled:h}),(0,o.jsx)(T,{lists:x,issues:g,isDragDisabled:b})]})}}}]);
//# sourceMappingURL=530.04aed3f9.chunk.js.map