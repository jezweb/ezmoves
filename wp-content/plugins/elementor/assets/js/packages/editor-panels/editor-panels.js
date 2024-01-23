(function(){"use strict";var __webpack_modules__=({"react":
/*!**************************!*\
  !*** external ["React"] ***!
  \**************************/
(function(module){module.exports=window["React"];}),"@elementor/editor":
/*!*****************************************!*\
  !*** external ["elementorV2","editor"] ***!
  \*****************************************/
(function(module){module.exports=window["elementorV2"]["editor"];}),"@elementor/editor-v1-adapters":
/*!***************************************************!*\
  !*** external ["elementorV2","editorV1Adapters"] ***!
  \***************************************************/
(function(module){module.exports=window["elementorV2"]["editorV1Adapters"];}),"@elementor/locations":
/*!********************************************!*\
  !*** external ["elementorV2","locations"] ***!
  \********************************************/
(function(module){module.exports=window["elementorV2"]["locations"];}),"@elementor/store":
/*!****************************************!*\
  !*** external ["elementorV2","store"] ***!
  \****************************************/
(function(module){module.exports=window["elementorV2"]["store"];}),"@elementor/ui":
/*!*************************************!*\
  !*** external ["elementorV2","ui"] ***!
  \*************************************/
(function(module){module.exports=window["elementorV2"]["ui"];})});var __webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(cachedModule!==undefined){return cachedModule.exports;}
var module=__webpack_module_cache__[moduleId]={exports:{}};__webpack_modules__[moduleId](module,module.exports,__webpack_require__);return module.exports;}!function(){__webpack_require__.d=function(exports,definition){for(var key in definition){if(__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)){Object.defineProperty(exports,key,{enumerable:true,get:definition[key]});}}};}();!function(){__webpack_require__.o=function(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}}();!function(){__webpack_require__.r=function(exports){if(typeof Symbol!=='undefined'&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});}
Object.defineProperty(exports,'__esModule',{value:true});};}();var __webpack_exports__={};!function(){
/*!**************************************************************!*\
  !*** ./node_modules/@elementor/editor-panels/dist/index.mjs ***!
  \**************************************************************/
__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{Panel:function(){return Panel;},PanelBody:function(){return PanelBody;},PanelHeader:function(){return PanelHeader;},PanelHeaderTitle:function(){return PanelHeaderTitle;},__createPanel:function(){return createPanel;},__registerPanel:function(){return registerPanel;}});var _elementor_editor__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! @elementor/editor */"@elementor/editor");var _elementor_store__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! @elementor/store */"@elementor/store");var react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! react */"react");var _elementor_locations__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! @elementor/locations */"@elementor/locations");var _elementor_ui__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! @elementor/ui */"@elementor/ui");var _elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! @elementor/editor-v1-adapters */"@elementor/editor-v1-adapters");var{inject:injectIntoPanels,useInjections:usePanelsInjections}=(0,_elementor_locations__WEBPACK_IMPORTED_MODULE_3__.createLocation)();var selectOpenId=(state)=>state.panels.openId;var initialState={openId:null};var slice_default=(0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__createSlice)({name:"panels",initialState,reducers:{open(state,action){state.openId=action.payload;},close(state,action){if(!action.payload||state.openId===action.payload){state.openId=null;}}}});function useOpenPanelInjection(){const injections=usePanelsInjections();const openId=(0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__useSelector)(selectOpenId);return(0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>injections.find((injection)=>openId===injection.id),[injections,openId]);}
var V2_PANEL="panel/v2";function getPortalContainer(){return document.querySelector("#elementor-panel-inner");}
function useV1PanelStatus(){return(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateUseRouteStatus)(V2_PANEL,{blockOnKitRoutes:true,blockOnPreviewMode:true});}
function sync(){(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateListenTo)((0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.windowEvent)("elementor/panel/init"),()=>(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateRegisterRoute)(V2_PANEL));(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateListenTo)((0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.routeOpenEvent)(V2_PANEL),()=>{getV1PanelElements().forEach((el)=>{el.setAttribute("hidden","hidden");el.setAttribute("aria-hidden","true");});});(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateListenTo)((0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.routeCloseEvent)(V2_PANEL),()=>selectOpenId((0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__getState)())&&(0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__dispatch)(slice_default.actions.close()));(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateListenTo)((0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.routeCloseEvent)(V2_PANEL),()=>{getV1PanelElements().forEach((el)=>{el.removeAttribute("hidden");el.removeAttribute("aria-hidden");});});(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateListenTo)((0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.windowEvent)("elementor/panel/init"),()=>subscribe({on:(state)=>selectOpenId(state),when:({prev,current})=>!!(!prev&&current),callback:()=>(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateOpenRoute)(V2_PANEL)}));(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateListenTo)((0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.windowEvent)("elementor/panel/init"),()=>subscribe({on:(state)=>selectOpenId(state),when:({prev,current})=>!!(!current&&prev),callback:()=>(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateIsRouteActive)(V2_PANEL)&&(0,_elementor_editor_v1_adapters__WEBPACK_IMPORTED_MODULE_5__.__privateOpenRoute)(getDefaultRoute())}));}
function getV1PanelElements(){const v1ElementsSelector=["#elementor-panel-header-wrapper","#elementor-panel-content-wrapper","#elementor-panel-state-loading","#elementor-panel-footer"].join(", ");return document.querySelectorAll(v1ElementsSelector);}
function getDefaultRoute(){const defaultRoute=window?.elementor?.documents?.getCurrent?.()?.config?.panel?.default_route;return defaultRoute||"panel/elements/categories";}
function subscribe({on,when,callback}){let prev;(0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__subscribe)(()=>{const current=on((0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__getState)());if(when({prev,current})){callback({prev,current});}
prev=current;});}
function Portal(props){const containerRef=(0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(getPortalContainer);if(!containerRef.current){return null;}
return react__WEBPACK_IMPORTED_MODULE_2__.createElement(_elementor_ui__WEBPACK_IMPORTED_MODULE_4__.Portal,{container:containerRef.current,...props});}
function Panels(){const openPanel=useOpenPanelInjection();const Component=openPanel?.component??null;if(!Component){return null;}
return react__WEBPACK_IMPORTED_MODULE_2__.createElement(Portal,null,react__WEBPACK_IMPORTED_MODULE_2__.createElement(Component,null));}
function init(){sync();(0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__registerSlice)(slice_default);(0,_elementor_editor__WEBPACK_IMPORTED_MODULE_0__.injectIntoTop)({id:"panels",component:Panels});}
function createPanel({id,component}){const usePanelStatus=createUseStatus(id);const usePanelActions=createUseActions(id,usePanelStatus);return{panel:{id,component},usePanelStatus,usePanelActions};}
function registerPanel({id,component}){injectIntoPanels({id,component});}
function createUseStatus(id){return()=>{const openPanelId=(0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__useSelector)(selectOpenId);const v1PanelStatus=useV1PanelStatus();return{isOpen:openPanelId===id&&v1PanelStatus.isActive,isBlocked:v1PanelStatus.isBlocked};};}
function createUseActions(id,useStatus){return()=>{const dispatch=(0,_elementor_store__WEBPACK_IMPORTED_MODULE_1__.__useDispatch)();const{isBlocked}=useStatus();return{open:async()=>{if(isBlocked){return;}
dispatch(slice_default.actions.open(id));},close:async()=>{if(isBlocked){return;}
dispatch(slice_default.actions.close(id));}};};}
function Panel({children,sx,...props}){return react__WEBPACK_IMPORTED_MODULE_2__.createElement(_elementor_ui__WEBPACK_IMPORTED_MODULE_4__.Drawer,{open:true,variant:"persistent",anchor:"left",PaperProps:{sx:{position:"relative",width:"100%",bgcolor:"background.default",border:"none"}},sx:{height:"100%",...sx},...props},children);}
var Header=(0,_elementor_ui__WEBPACK_IMPORTED_MODULE_4__.styled)(_elementor_ui__WEBPACK_IMPORTED_MODULE_4__.Box)(({theme})=>({height:theme?.spacing(6)||"48px",display:"flex",alignItems:"center",justifyContent:"center"}));function PanelHeader({children,...props}){return react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_2__.createElement(Header,{component:"header",...props},children),react__WEBPACK_IMPORTED_MODULE_2__.createElement(_elementor_ui__WEBPACK_IMPORTED_MODULE_4__.Divider,null));}
function PanelHeaderTitle({children,...props}){return react__WEBPACK_IMPORTED_MODULE_2__.createElement(_elementor_ui__WEBPACK_IMPORTED_MODULE_4__.Typography,{component:"h2",variant:"h6",...props},children);}
function PanelBody({children,sx,...props}){return react__WEBPACK_IMPORTED_MODULE_2__.createElement(_elementor_ui__WEBPACK_IMPORTED_MODULE_4__.Box,{component:"main",sx:{overflowY:"auto",height:"100%",...sx},...props},children);}
init();}();(window.elementorV2=window.elementorV2||{}).editorPanels=__webpack_exports__;})();