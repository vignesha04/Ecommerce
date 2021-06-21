!function(e,t){"use strict";function r(){function e(e,t,n,i){return function(l,s,d){if(!d.hasOwnProperty(a)){var c=d.$normalize(t);!r[c]||o(s,n)||d[c]||l.$watch(d[e],function(e){e=i?!e:!!e,s.attr(t,e)})}}}var r={ariaHidden:!0,ariaChecked:!0,ariaReadonly:!0,ariaDisabled:!0,ariaRequired:!0,ariaInvalid:!0,ariaValue:!0,tabindex:!0,bindKeydown:!0,bindRoleForClick:!0};this.config=function(e){r=t.extend(r,e)},this.$get=function(){return{config:function(e){return r[e]},$$watchExpr:e}}}var a="ngAriaDisable",n=t.module("ngAria",["ng"]).info({angularVersion:"1.7.8"}).provider("$aria",r),i=["BUTTON","A","INPUT","TEXTAREA","SELECT","DETAILS","SUMMARY"],o=function(e,t){return-1!==t.indexOf(e[0].nodeName)?!0:void 0};n.directive("ngShow",["$aria",function(e){return e.$$watchExpr("ngShow","aria-hidden",[],!0)}]).directive("ngHide",["$aria",function(e){return e.$$watchExpr("ngHide","aria-hidden",[],!1)}]).directive("ngValue",["$aria",function(e){return e.$$watchExpr("ngValue","aria-checked",i,!1)}]).directive("ngChecked",["$aria",function(e){return e.$$watchExpr("ngChecked","aria-checked",i,!1)}]).directive("ngReadonly",["$aria",function(e){return e.$$watchExpr("ngReadonly","aria-readonly",i,!1)}]).directive("ngRequired",["$aria",function(e){return e.$$watchExpr("ngRequired","aria-required",i,!1)}]).directive("ngModel",["$aria",function(e){function t(t,r,a,n){return e.config(r)&&!a.attr(t)&&(n||!o(a,i))&&("hidden"!==a.attr("type")||"INPUT"!==a[0].nodeName)}function r(e,t){return!t.attr("role")&&t.attr("type")===e&&!o(t,i)}function n(e,t){var r=e.type,a=e.role;return"checkbox"===(r||a)||"menuitemcheckbox"===a?"checkbox":"radio"===(r||a)||"menuitemradio"===a?"radio":"range"===r||"progressbar"===a||"slider"===a?"range":""}return{restrict:"A",require:"ngModel",priority:200,compile:function(i,o){if(!o.hasOwnProperty(a)){var l=n(o,i);return{post:function(a,n,i,o){function s(){return o.$modelValue}function d(e){var t=i.value==o.$viewValue;n.attr("aria-checked",t)}function c(){n.attr("aria-checked",!o.$isEmpty(o.$viewValue))}var h=t("tabindex","tabindex",n,!1);switch(l){case"radio":case"checkbox":r(l,n)&&n.attr("role",l),t("aria-checked","ariaChecked",n,!1)&&a.$watch(s,"radio"===l?d:c),h&&n.attr("tabindex",0);break;case"range":if(r(l,n)&&n.attr("role","slider"),e.config("ariaValue")){var f=!n.attr("aria-valuemin")&&(i.hasOwnProperty("min")||i.hasOwnProperty("ngMin")),u=!n.attr("aria-valuemax")&&(i.hasOwnProperty("max")||i.hasOwnProperty("ngMax")),p=!n.attr("aria-valuenow");f&&i.$observe("min",function(e){n.attr("aria-valuemin",e)}),u&&i.$observe("max",function(e){n.attr("aria-valuemax",e)}),p&&a.$watch(s,function(e){n.attr("aria-valuenow",e)})}h&&n.attr("tabindex",0)}!i.hasOwnProperty("ngRequired")&&o.$validators.required&&t("aria-required","ariaRequired",n,!1)&&i.$observe("required",function(){n.attr("aria-required",!!i.required)}),t("aria-invalid","ariaInvalid",n,!0)&&a.$watch(function(){return o.$invalid},function(e){n.attr("aria-invalid",!!e)})}}}}}}]).directive("ngDisabled",["$aria",function(e){return e.$$watchExpr("ngDisabled","aria-disabled",i,!1)}]).directive("ngMessages",function(){return{restrict:"A",require:"?ngMessages",link:function(e,t,r,n){r.hasOwnProperty(a)||t.attr("aria-live")||t.attr("aria-live","assertive")}}}).directive("ngClick",["$aria","$parse",function(e,t){return{restrict:"A",compile:function(r,n){if(!n.hasOwnProperty(a)){var l=t(n.ngClick);return function(t,r,a){o(r,i)||(e.config("bindRoleForClick")&&!r.attr("role")&&r.attr("role","button"),e.config("tabindex")&&!r.attr("tabindex")&&r.attr("tabindex",0),!e.config("bindKeydown")||a.ngKeydown||a.ngKeypress||a.ngKeyup||r.on("keydown",function(e){function r(){l(t,{$event:e})}var a=e.which||e.keyCode;(13===a||32===a)&&(-1!==i.indexOf(e.target.nodeName)||e.target.isContentEditable||e.preventDefault(),t.$apply(r))}))}}}}}]).directive("ngDblclick",["$aria",function(e){return function(t,r,n){n.hasOwnProperty(a)||!e.config("tabindex")||r.attr("tabindex")||o(r,i)||r.attr("tabindex",0)}}]),describe("$aria",function(){function e(e){s=l(e)(o),o.$digest()}function r(e){return function(){module(function(t){t.config(e)})}}function a(e,r,a){t.forEach(e,function(e){expect(t.element(e).attr(r)).toBe(a)})}function n(){return inject(function(e,t){l=e,o=t})}var o,l,s;beforeEach(module("ngAria")),afterEach(function(){dealoc(s)}),describe("with `ngAriaDisable`",function(){beforeEach(n),beforeEach(function(){jasmine.addMatchers({toHaveAttribute:function(){return{compare:function(e,t){var r=e[0],a=r.hasAttribute(t),n="Expected `"+r.outerHTML+"` "+(a?"not ":"")+"to have attribute `"+t+"`.";return{pass:a,message:n}}}}})}),it("should not attach aria-checked to custom checkbox",function(){e('<div role="checkbox" ng-model="val" ng-aria-disable></div>'),o.$apply("val = false"),expect(s).not.toHaveAttribute("aria-checked"),o.$apply("val = true"),expect(s).not.toHaveAttribute("aria-checked")}),it("should not attach aria-checked to custom radio controls",function(){e('<div role="radio" ng-model="val" value="one" ng-aria-disable></div><div role="radio" ng-model="val" value="two" ng-aria-disable></div>');var t=s.eq(0),r=s.eq(1);o.$apply('val = "one"'),expect(t).not.toHaveAttribute("aria-checked"),expect(r).not.toHaveAttribute("aria-checked"),o.$apply('val = "two"'),expect(t).not.toHaveAttribute("aria-checked"),expect(r).not.toHaveAttribute("aria-checked")}),it("should not attach aria-disabled to custom controls",function(){e('<div ng-disabled="val" ng-aria-disable></div>'),o.$apply("val = false"),expect(s).not.toHaveAttribute("aria-disabled"),o.$apply("val = true"),expect(s).not.toHaveAttribute("aria-disabled")}),it("should not attach aria-hidden to `ngShow`",function(){e('<div ng-show="val" ng-aria-disable></div>'),o.$apply("val = false"),expect(s).not.toHaveAttribute("aria-hidden"),o.$apply("val = true"),expect(s).not.toHaveAttribute("aria-hidden")}),it("should not attach aria-hidden to `ngHide`",function(){e('<div ng-hide="val" ng-aria-disable></div>'),o.$apply("val = false"),expect(s).not.toHaveAttribute("aria-hidden"),o.$apply("val = true"),expect(s).not.toHaveAttribute("aria-hidden")}),it("should not attach aria-invalid to input",function(){e('<input ng-model="val" ng-minlength="10" ng-aria-disable />'),o.$apply('val = "lt 10"'),expect(s).not.toHaveAttribute("aria-invalid"),o.$apply('val = "gt 10 characters"'),expect(s).not.toHaveAttribute("aria-invalid")}),it("should not attach aria-invalid to custom controls",function(){e('<div role="textbox" ng-model="val" ng-minlength="10" ng-aria-disable></div>'),o.$apply('val = "lt 10"'),expect(s).not.toHaveAttribute("aria-invalid"),o.$apply('val = "gt 10 characters"'),expect(s).not.toHaveAttribute("aria-invalid")}),it("should not attach aria-live to `ngMessages`",function(){e('<div ng-messages="val" ng-aria-disable>'),expect(s).not.toHaveAttribute("aria-live")}),it("should not attach aria-readonly to custom controls",function(){e('<div ng-readonly="val" ng-aria-disable></div>'),o.$apply("val = false"),expect(s).not.toHaveAttribute("aria-readonly"),o.$apply("val = true"),expect(s).not.toHaveAttribute("aria-readonly")}),it("should not attach aria-required to custom controls with `required`",function(){e('<div ng-model="val" required ng-aria-disable></div>'),expect(s).not.toHaveAttribute("aria-required")}),it("should not attach aria-required to custom controls with `ngRequired`",function(){e('<div ng-model="val" ng-required="val" ng-aria-disable></div>'),o.$apply("val = false"),expect(s).not.toHaveAttribute("aria-required"),o.$apply("val = true"),expect(s).not.toHaveAttribute("aria-required")}),it("should not attach aria-value* to input[range]",function(){e('<input type="range" ng-model="val" min="0" max="100" ng-aria-disable />'),expect(s).not.toHaveAttribute("aria-valuemax"),expect(s).not.toHaveAttribute("aria-valuemin"),expect(s).not.toHaveAttribute("aria-valuenow"),o.$apply("val = 50"),expect(s).not.toHaveAttribute("aria-valuemax"),expect(s).not.toHaveAttribute("aria-valuemin"),expect(s).not.toHaveAttribute("aria-valuenow"),o.$apply("val = 150"),expect(s).not.toHaveAttribute("aria-valuemax"),expect(s).not.toHaveAttribute("aria-valuemin"),expect(s).not.toHaveAttribute("aria-valuenow")}),it("should not attach aria-value* to custom controls",function(){e('<div role="progressbar" ng-model="val" min="0" max="100" ng-aria-disable></div><div role="slider" ng-model="val" min="0" max="100" ng-aria-disable></div>');var t=s.eq(0),r=s.eq(1);["aria-valuemax","aria-valuemin","aria-valuenow"].forEach(function(e){expect(t).not.toHaveAttribute(e),expect(r).not.toHaveAttribute(e)}),o.$apply("val = 50"),["aria-valuemax","aria-valuemin","aria-valuenow"].forEach(function(e){expect(t).not.toHaveAttribute(e),expect(r).not.toHaveAttribute(e)}),o.$apply("val = 150"),["aria-valuemax","aria-valuemin","aria-valuenow"].forEach(function(e){expect(t).not.toHaveAttribute(e),expect(r).not.toHaveAttribute(e)})}),it("should not bind keypress to `ngClick`",function(){o.onClick=jasmine.createSpy("onClick"),e('<div ng-click="onClick()" tabindex="0" ng-aria-disable></div><ul><li ng-click="onClick()" tabindex="0" ng-aria-disable></li></ul>');var t=s.find("div"),r=s.find("li");t.triggerHandler({type:"keypress",keyCode:32}),r.triggerHandler({type:"keypress",keyCode:32}),expect(o.onClick).not.toHaveBeenCalled()}),it("should not attach role to custom controls",function(){e('<div ng-click="onClick()" ng-aria-disable></div><div type="checkbox" ng-model="val" ng-aria-disable></div><div type="radio" ng-model="val" ng-aria-disable></div><div type="range" ng-model="val" ng-aria-disable></div>'),expect(s.eq(0)).not.toHaveAttribute("role"),expect(s.eq(1)).not.toHaveAttribute("role"),expect(s.eq(2)).not.toHaveAttribute("role"),expect(s.eq(3)).not.toHaveAttribute("role")}),it("should not attach tabindex to custom controls",function(){e('<div role="checkbox" ng-model="val" ng-aria-disable></div><div role="slider" ng-model="val" ng-aria-disable></div>'),expect(s.eq(0)).not.toHaveAttribute("tabindex"),expect(s.eq(1)).not.toHaveAttribute("tabindex")}),it("should not attach tabindex to `ngClick` or `ngDblclick`",function(){e('<div ng-click="onClick()" ng-aria-disable></div><div ng-dblclick="onDblclick()" ng-aria-disable></div>'),expect(s.eq(0)).not.toHaveAttribute("tabindex"),expect(s.eq(1)).not.toHaveAttribute("tabindex")})}),describe("aria-hidden",function(){beforeEach(n),it("should attach aria-hidden to ng-show",function(){e('<div ng-show="val"></div>'),o.$apply("val = false"),expect(s.attr("aria-hidden")).toBe("true"),o.$apply("val = true"),expect(s.attr("aria-hidden")).toBe("false")}),it("should attach aria-hidden to ng-hide",function(){e('<div ng-hide="val"></div>'),o.$apply("val = false"),expect(s.attr("aria-hidden")).toBe("false"),o.$apply("val = true"),expect(s.attr("aria-hidden")).toBe("true")}),it("should not change aria-hidden if it is already present on ng-show",function(){e('<div ng-show="val" aria-hidden="userSetValue"></div>'),expect(s.attr("aria-hidden")).toBe("userSetValue"),o.$apply("val = true"),expect(s.attr("aria-hidden")).toBe("userSetValue")}),it("should not change aria-hidden if it is already present on ng-hide",function(){e('<div ng-hide="val" aria-hidden="userSetValue"></div>'),expect(s.attr("aria-hidden")).toBe("userSetValue"),o.$apply("val = true"),expect(s.attr("aria-hidden")).toBe("userSetValue")}),it("should always set aria-hidden to a boolean value",function(){e('<div ng-hide="val"></div>'),o.$apply('val = "test angular"'),expect(s.attr("aria-hidden")).toBe("true"),o.$apply("val = null"),expect(s.attr("aria-hidden")).toBe("false"),o.$apply("val = {}"),expect(s.attr("aria-hidden")).toBe("true"),e('<div ng-show="val"></div>'),o.$apply('val = "test angular"'),expect(s.attr("aria-hidden")).toBe("false"),o.$apply("val = null"),expect(s.attr("aria-hidden")).toBe("true"),o.$apply("val = {}"),expect(s.attr("aria-hidden")).toBe("false")})}),describe("aria-hidden when disabled",function(){beforeEach(r({ariaHidden:!1})),beforeEach(n),it("should not attach aria-hidden",function(){o.$apply("val = false"),e('<div ng-show="val"></div>'),expect(s.attr("aria-hidden")).toBeUndefined(),e('<div ng-hide="val"></div>'),expect(s.attr("aria-hidden")).toBeUndefined()})}),describe("aria-checked",function(){beforeEach(n),it('should not attach itself to native input type="checkbox"',function(){e('<input type="checkbox" ng-model="val">'),o.$apply("val = true"),expect(s.attr("aria-checked")).toBeUndefined(),o.$apply("val = false"),expect(s.attr("aria-checked")).toBeUndefined()}),it("should attach itself to custom checkbox",function(){e('<div role="checkbox" ng-model="val"></div>'),o.$apply('val = "checked"'),expect(s.attr("aria-checked")).toBe("true"),o.$apply("val = null"),expect(s.attr("aria-checked")).toBe("false")}),it("should use `$isEmpty()` to determine if the checkbox is checked",function(){e('<div role="checkbox" ng-model="val"></div>');var t=s.controller("ngModel");t.$isEmpty=function(e){return"not-checked"===e},o.$apply("val = true"),expect(t.$modelValue).toBe(!0),expect(s.attr("aria-checked")).toBe("true"),o.$apply("val = false"),expect(t.$modelValue).toBe(!1),expect(s.attr("aria-checked")).toBe("true"),o.$apply('val = "not-checked"'),expect(t.$modelValue).toBe("not-checked"),expect(s.attr("aria-checked")).toBe("false"),o.$apply('val = "checked"'),expect(t.$modelValue).toBe("checked"),expect(s.attr("aria-checked")).toBe("true")}),it("should not handle native checkbox with ngChecked",function(){var e=l('<input type="checkbox" ng-checked="val">')(o);o.$apply("val = true"),expect(e.attr("aria-checked")).toBeUndefined(),o.$apply("val = false"),expect(e.attr("aria-checked")).toBeUndefined()}),it("should handle custom checkbox with ngChecked",function(){var e=l('<div role="checkbox" ng-checked="val">')(o);o.$apply("val = true"),expect(e.eq(0).attr("aria-checked")).toBe("true"),o.$apply("val = false"),expect(e.eq(0).attr("aria-checked")).toBe("false")}),it('should not attach to native input type="radio"',function(){var e=l('<input type="radio" ng-model="val" value="one"><input type="radio" ng-model="val" value="two">')(o);o.$apply("val='one'"),expect(e.eq(0).attr("aria-checked")).toBeUndefined(),expect(e.eq(1).attr("aria-checked")).toBeUndefined(),o.$apply("val='two'"),expect(e.eq(0).attr("aria-checked")).toBeUndefined(),expect(e.eq(1).attr("aria-checked")).toBeUndefined()}),it("should attach to custom radio controls",function(){var e=l('<div role="radio" ng-model="val" value="one"></div><div role="radio" ng-model="val" value="two"></div>')(o);o.$apply("val='one'"),expect(e.eq(0).attr("aria-checked")).toBe("true"),expect(e.eq(1).attr("aria-checked")).toBe("false"),o.$apply("val='two'"),expect(e.eq(0).attr("aria-checked")).toBe("false"),expect(e.eq(1).attr("aria-checked")).toBe("true")}),it("should handle custom radios with integer model values",function(){var e=l('<div role="radio" ng-model="val" value="0"></div><div role="radio" ng-model="val" value="1"></div>')(o);o.$apply("val=0"),expect(e.eq(0).attr("aria-checked")).toBe("true"),expect(e.eq(1).attr("aria-checked")).toBe("false"),o.$apply("val=1"),expect(e.eq(0).attr("aria-checked")).toBe("false"),expect(e.eq(1).attr("aria-checked")).toBe("true")}),it("should handle radios with boolean model values using ngValue",function(){var e=l('<div role="radio" ng-model="val" ng-value="valExp"></div><div role="radio" ng-model="val" ng-value="valExp2"></div>')(o);o.$apply(function(){o.valExp=!0,o.valExp2=!1,o.val=!0}),expect(e.eq(0).attr("aria-checked")).toBe("true"),expect(e.eq(1).attr("aria-checked")).toBe("false"),o.$apply("val = false"),expect(e.eq(0).attr("aria-checked")).toBe("false"),expect(e.eq(1).attr("aria-checked")).toBe("true")}),it('should attach itself to role="menuitemradio"',function(){o.val="one",e('<div role="menuitemradio" ng-model="val" value="one"></div>'),expect(s.attr("aria-checked")).toBe("true"),o.$apply("val = 'two'"),expect(s.attr("aria-checked")).toBe("false")}),it('should attach itself to role="menuitemcheckbox"',function(){e('<div role="menuitemcheckbox" ng-model="val"></div>'),o.$apply('val = "checked"'),expect(s.attr("aria-checked")).toBe("true"),o.$apply("val = null"),expect(s.attr("aria-checked")).toBe("false")}),it("should not attach itself if an aria-checked value is already present",function(){var e=[l("<div role='radio' ng-model='val' value='{{val3}}' aria-checked='userSetValue'></div>")(o),l("<div role='menuitemradio' ng-model='val' value='{{val3}}' aria-checked='userSetValue'></div>")(o),l("<div role='checkbox' checked='checked' aria-checked='userSetValue'></div>")(o),l("<div role='menuitemcheckbox' checked='checked' aria-checked='userSetValue'></div>")(o)];o.$apply("val1=true;val2='one';val3='1'"),a(e,"aria-checked","userSetValue")})}),describe("roles for custom inputs",function(){beforeEach(n),it('should add missing role="button" to custom input',function(){e('<div ng-click="someFunction()"></div>'),expect(s.attr("role")).toBe("button")}),it('should not add role="button" to anchor',function(){e('<a ng-click="someFunction()"></a>'),expect(s.attr("role")).not.toBe("button")}),it('should add missing role="checkbox" to custom input',function(){e('<div type="checkbox" ng-model="val"></div>'),expect(s.attr("role")).toBe("checkbox")}),it("should not add a role to a native checkbox",function(){e('<input type="checkbox" ng-model="val"/>'),expect(s.attr("role")).toBeUndefined()}),it('should add missing role="radio" to custom input',function(){e('<div type="radio" ng-model="val"></div>'),expect(s.attr("role")).toBe("radio")}),it("should not add a role to a native radio button",function(){e('<input type="radio" ng-model="val"/>'),expect(s.attr("role")).toBeUndefined()}),it('should add missing role="slider" to custom input',function(){e('<div type="range" ng-model="val"></div>'),expect(s.attr("role")).toBe("slider")}),it("should not add a role to a native range input",function(){e('<input type="range" ng-model="val"/>'),expect(s.attr("role")).toBeUndefined()}),they("should not add role to native $prop controls",{input:'<input type="text" ng-model="val">',select:'<select type="checkbox" ng-model="val"></select>',textarea:'<textarea type="checkbox" ng-model="val"></textarea>',button:'<button ng-click="doClick()"></button>',summary:'<summary ng-click="doClick()"></summary>',details:'<details ng-click="doClick()"></details>',a:'<a ng-click="doClick()"></a>'},function(e){var t=l(e)(o);expect(t.attr("role")).toBeUndefined()})}),describe("aria-checked when disabled",function(){beforeEach(r({ariaChecked:!1})),beforeEach(n),it("should not attach aria-checked",function(){e("<div role='radio' ng-model='val' value='{{val}}'></div>"),expect(s.attr("aria-checked")).toBeUndefined(),e("<div role='menuitemradio' ng-model='val' value='{{val}}'></div>"),expect(s.attr("aria-checked")).toBeUndefined(),e("<div role='checkbox' checked='checked'></div>"),expect(s.attr("aria-checked")).toBeUndefined(),e("<div role='menuitemcheckbox' checked='checked'></div>"),expect(s.attr("aria-checked")).toBeUndefined()})}),describe("aria-disabled",function(){beforeEach(n),they("should not attach itself to native $prop controls",{input:'<input ng-disabled="val">',textarea:'<textarea ng-disabled="val"></textarea>',select:'<select ng-disabled="val"></select>',button:'<button ng-disabled="val"></button>'},function(e){var t=l(e)(o);o.$apply("val = true"),expect(t.attr("disabled")).toBeDefined(),expect(t.attr("aria-disabled")).toBeUndefined()}),it("should attach itself to custom controls",function(){e('<div ng-disabled="val"></div>'),expect(s.attr("aria-disabled")).toBe("false"),o.$apply("val = true"),expect(s.attr("aria-disabled")).toBe("true")}),it("should not attach itself if an aria-disabled attribute is already present",function(){e('<div ng-disabled="val" aria-disabled="userSetValue"></div>'),expect(s.attr("aria-disabled")).toBe("userSetValue")}),it("should always set aria-disabled to a boolean value",function(){e('<div ng-disabled="val"></div>'),o.$apply('val = "test angular"'),expect(s.attr("aria-disabled")).toBe("true"),o.$apply("val = null"),expect(s.attr("aria-disabled")).toBe("false"),o.$apply("val = {}"),expect(s.attr("aria-disabled")).toBe("true")})}),describe("aria-disabled when disabled",function(){beforeEach(r({ariaDisabled:!1})),beforeEach(n),it("should not attach aria-disabled",function(){e('<div ng-disabled="val"></div>'),o.$apply("val = true"),expect(s.attr("aria-disabled")).toBeUndefined()})}),describe("aria-invalid",function(){beforeEach(n),it("should attach aria-invalid to input",function(){e('<input ng-model="txtInput" ng-minlength="10">'),o.$apply("txtInput='LTten'"),expect(s.attr("aria-invalid")).toBe("true"),o.$apply("txtInput='morethantencharacters'"),expect(s.attr("aria-invalid")).toBe("false")}),it("should attach aria-invalid to custom controls",function(){e('<div ng-model="txtInput" role="textbox" ng-minlength="10"></div>'),o.$apply("txtInput='LTten'"),expect(s.attr("aria-invalid")).toBe("true"),o.$apply("txtInput='morethantencharacters'"),expect(s.attr("aria-invalid")).toBe("false")}),it("should not attach itself if aria-invalid is already present",function(){e('<input ng-model="txtInput" ng-minlength="10" aria-invalid="userSetValue">'),o.$apply("txtInput='LTten'"),expect(s.attr("aria-invalid")).toBe("userSetValue")}),it('should not attach if input is type="hidden"',function(){e('<input type="hidden" ng-model="txtInput">'),expect(s.attr("aria-invalid")).toBeUndefined()}),it('should attach aria-invalid to custom control that is type="hidden"',function(){e('<div ng-model="txtInput" type="hidden" role="textbox" ng-minlength="10"></div>'),o.$apply("txtInput='LTten'"),expect(s.attr("aria-invalid")).toBe("true"),o.$apply("txtInput='morethantencharacters'"),expect(s.attr("aria-invalid")).toBe("false")})}),describe("aria-invalid when disabled",function(){beforeEach(r({ariaInvalid:!1})),beforeEach(n),it("should not attach aria-invalid if the option is disabled",function(){o.$apply("txtInput='LTten'"),e('<input ng-model="txtInput" ng-minlength="10">'),expect(s.attr("aria-invalid")).toBeUndefined()})}),describe("aria-readonly",function(){beforeEach(n),they("should not attach itself to native $prop controls",{input:'<input ng-readonly="val">',textarea:'<textarea ng-readonly="val"></textarea>',select:'<select ng-readonly="val"></select>',button:'<button ng-readonly="val"></button>'},function(e){var t=l(e)(o);o.$apply("val = true"),expect(t.attr("readonly")).toBeDefined(),expect(t.attr("aria-readonly")).toBeUndefined()}),it("should attach itself to custom controls",function(){e('<div ng-readonly="val"></div>'),expect(s.attr("aria-readonly")).toBe("false"),o.$apply("val = true"),expect(s.attr("aria-readonly")).toBe("true")}),it("should not attach itself if an aria-readonly attribute is already present",function(){e('<div ng-readonly="val" aria-readonly="userSetValue"></div>'),expect(s.attr("aria-readonly")).toBe("userSetValue")}),it("should always set aria-readonly to a boolean value",function(){e('<div ng-readonly="val"></div>'),o.$apply('val = "test angular"'),expect(s.attr("aria-readonly")).toBe("true"),o.$apply("val = null"),expect(s.attr("aria-readonly")).toBe("false"),o.$apply("val = {}"),expect(s.attr("aria-readonly")).toBe("true")})}),describe("aria-readonly when disabled",function(){beforeEach(r({ariaReadonly:!1})),beforeEach(n),it("should not add the aria-readonly attribute",function(){e("<input ng-model='val' readonly>"),expect(s.attr("aria-readonly")).toBeUndefined(),e("<div ng-model='val' ng-readonly='true'></div>"),expect(s.attr("aria-readonly")).toBeUndefined()})}),describe("aria-required",function(){beforeEach(n),it("should not attach to input",function(){e('<input ng-model="val" required>'),expect(s.attr("aria-required")).toBeUndefined()}),it("should attach to custom controls with ngModel and required",function(){e('<div ng-model="val" role="checkbox" required></div>'),expect(s.attr("aria-required")).toBe("true")}),it("should set aria-required to false when ng-required is false",function(){e("<div role='checkbox' ng-required='false' ng-model='val'></div>"),expect(s.attr("aria-required")).toBe("false")}),it("should attach to custom controls with ngRequired",function(){e('<div role="checkbox" ng-model="val" ng-required="true"></div>'),expect(s.attr("aria-required")).toBe("true")}),it("should not attach itself if aria-required is already present",function(){e("<div role='checkbox' ng-model='val' ng-required='true' aria-required='userSetValue'></div>"),expect(s.attr("aria-required")).toBe("userSetValue")})}),describe("aria-required when disabled",function(){beforeEach(r({ariaRequired:!1})),beforeEach(n),it("should not add the aria-required attribute",function(){e("<input ng-model='val' required>"),expect(s.attr("aria-required")).toBeUndefined(),e("<div ng-model='val' ng-required='true'></div>"),expect(s.attr("aria-required")).toBeUndefined()})}),describe("aria-value",function(){beforeEach(n),it('should attach to input type="range"',function(){var e=[l('<input type="range" ng-model="val" min="0" max="100">')(o),l('<div role="progressbar" min="0" max="100" ng-model="val">')(o),l('<div role="slider" min="0" max="100" ng-model="val">')(o)];o.$apply("val = 50"),a(e,"aria-valuenow","50"),a(e,"aria-valuemin","0"),a(e,"aria-valuemax","100"),o.$apply("val = 90"),a(e,"aria-valuenow","90")}),it("should not attach if aria-value* is already present",function(){var e=[l('<input type="range" ng-model="val" min="0" max="100" aria-valuenow="userSetValue1" aria-valuemin="userSetValue2" aria-valuemax="userSetValue3">')(o),l('<div role="progressbar" min="0" max="100" ng-model="val" aria-valuenow="userSetValue1" aria-valuemin="userSetValue2" aria-valuemax="userSetValue3">')(o),l('<div role="slider" min="0" max="100" ng-model="val" aria-valuenow="userSetValue1" aria-valuemin="userSetValue2" aria-valuemax="userSetValue3">')(o)];o.$apply("val = 50"),a(e,"aria-valuenow","userSetValue1"),a(e,"aria-valuemin","userSetValue2"),a(e,"aria-valuemax","userSetValue3")}),it("should update `aria-valuemin/max` when `min/max` changes dynamically",function(){o.$apply("min = 25; max = 75"),e('<input type="range" ng-model="val" min="{{min}}" max="{{max}}" />'),expect(s.attr("aria-valuemin")).toBe("25"),expect(s.attr("aria-valuemax")).toBe("75"),o.$apply("min = 0"),expect(s.attr("aria-valuemin")).toBe("0"),o.$apply("max = 100"),expect(s.attr("aria-valuemax")).toBe("100")}),it("should update `aria-valuemin/max` when `ng-min/ng-max` changes dynamically",function(){o.$apply("min = 25; max = 75"),e('<input type="range" ng-model="val" ng-min="min" ng-max="max" />'),expect(s.attr("aria-valuemin")).toBe("25"),expect(s.attr("aria-valuemax")).toBe("75"),o.$apply("min = 0"),expect(s.attr("aria-valuemin")).toBe("0"),o.$apply("max = 100"),expect(s.attr("aria-valuemax")).toBe("100")})}),describe("announcing ngMessages",function(){beforeEach(n),it("should attach aria-live",function(){var e=[l('<div ng-messages="myForm.myName.$error">')(o)];a(e,"aria-live","assertive")})}),describe("aria-value when disabled",function(){beforeEach(r({ariaValue:!1})),beforeEach(n),it("should not attach itself",function(){o.$apply("val = 50"),e('<input type="range" ng-model="val" min="0" max="100">'),expect(s.attr("aria-valuenow")).toBeUndefined(),expect(s.attr("aria-valuemin")).toBeUndefined(),expect(s.attr("aria-valuemax")).toBeUndefined(),e('<div role="progressbar" min="0" max="100" ng-model="val">'),expect(s.attr("aria-valuenow")).toBeUndefined(),expect(s.attr("aria-valuemin")).toBeUndefined(),expect(s.attr("aria-valuemax")).toBeUndefined()})}),describe("tabindex",function(){beforeEach(n),they("should not attach to native control $prop",{button:"<button ng-click='something'></button>",a:"<a ng-href='#/something'>","input[text]":"<input type='text' ng-model='val'>","input[radio]":"<input type='radio' ng-model='val'>","input[checkbox]":"<input type='checkbox' ng-model='val'>",textarea:"<textarea ng-model='val'></textarea>",select:"<select ng-model='val'></select>",details:"<details ng-model='val'></details>"},function(t){e(t),expect(s.attr("tabindex")).toBeUndefined()}),it("should not attach to random ng-model elements",function(){e('<div ng-model="val"></div>'),expect(s.attr("tabindex")).toBeUndefined()}),it("should attach tabindex to custom inputs",function(){e('<div role="checkbox" ng-model="val"></div>'),expect(s.attr("tabindex")).toBe("0"),e('<div role="slider" ng-model="val"></div>'),expect(s.attr("tabindex")).toBe("0")}),it("should attach to ng-click and ng-dblclick",function(){e('<div ng-click="someAction()"></div>'),expect(s.attr("tabindex")).toBe("0"),e('<div ng-dblclick="someAction()"></div>'),expect(s.attr("tabindex")).toBe("0")}),it("should not attach tabindex if it is already on an element",function(){e('<div role="button" tabindex="userSetValue"></div>'),expect(s.attr("tabindex")).toBe("userSetValue"),e('<div role="checkbox" tabindex="userSetValue"></div>'),expect(s.attr("tabindex")).toBe("userSetValue"),e('<div ng-click="someAction()" tabindex="userSetValue"></div>'),expect(s.attr("tabindex")).toBe("userSetValue"),e('<div ng-dblclick="someAction()" tabindex="userSetValue"></div>'),expect(s.attr("tabindex")).toBe("userSetValue")})}),describe("accessible actions",function(){var t;beforeEach(n),beforeEach(function(){t=[],o.onClick=jasmine.createSpy("onClick").and.callFake(function(e){var r=e?e.target.nodeName.toLowerCase():"",a=!(!e||!e.isDefaultPrevented());t.push(r+"("+a+")")})}),it("should trigger a click from the keyboard (and prevent default action)",function(){e('<section><div ng-click="onClick($event)"></div><ul><li ng-click="onClick($event)"></li></ul></section>');var r=s.find("div"),a=s.find("li");r.triggerHandler({type:"keydown",keyCode:13}),a.triggerHandler({type:"keydown",keyCode:13}),r.triggerHandler({type:"keydown",keyCode:32}),a.triggerHandler({type:"keydown",keyCode:32}),expect(t).toEqual(["div(true)","li(true)","div(true)","li(true)"])}),it("should trigger a click in browsers that provide `event.which` instead of `event.keyCode`",function(){e('<section><div ng-click="onClick($event)"></div><ul><li ng-click="onClick($event)"></li></ul></section>');var r=s.find("div"),a=s.find("li");r.triggerHandler({type:"keydown",which:13}),a.triggerHandler({type:"keydown",which:13}),r.triggerHandler({type:"keydown",which:32}),a.triggerHandler({type:"keydown",which:32}),expect(t).toEqual(["div(true)","li(true)","div(true)","li(true)"])}),it("should not prevent default keyboard action if the target element has editable content",inject(function(r){function a(e){return{bubbles:!0,cancelable:!0,keyCode:e}}e('<section><div id="no-attribute"><div ng-click="onClick($event)"></div><ul ng-click="onClick($event)"><li></li></ul></div><div id="value-empty"><div ng-click="onClick($event)" contenteditable=""></div><ul ng-click="onClick($event)"><li contenteditable=""></li></ul></div><div id="value-true"><div ng-click="onClick($event)" contenteditable="true"></div><ul ng-click="onClick($event)"><li contenteditable="true"></li></ul></div><div id="value-false"><div ng-click="onClick($event)" contenteditable="false"></div><ul ng-click="onClick($event)"><li contenteditable="false"></li></ul></div></section>'),r.find("body").append(s);var n,i=s.children();n=i.eq(0),browserTrigger(n.find("div"),"keydown",a(13)),browserTrigger(n.find("ul"),"keydown",a(32)),browserTrigger(n.find("li"),"keydown",a(13)),expect(t).toEqual(["div(true)","ul(true)","li(true)"]),t=[],n=i.eq(1),browserTrigger(n.find("div"),"keydown",a(32)),browserTrigger(n.find("ul"),"keydown",a(13)),browserTrigger(n.find("li"),"keydown",a(32)),expect(t).toEqual(["div(false)","ul(true)","li(false)"]),t=[],n=i.eq(2),browserTrigger(n.find("div"),"keydown",a(13)),browserTrigger(n.find("ul"),"keydown",a(32)),browserTrigger(n.find("li"),"keydown",a(13)),expect(t).toEqual(["div(false)","ul(true)","li(false)"]),t=[],n=i.eq(3),browserTrigger(n.find("div"),"keydown",a(32)),browserTrigger(n.find("ul"),"keydown",a(13)),browserTrigger(n.find("li"),"keydown",a(32)),
expect(t).toEqual(["div(true)","ul(true)","li(true)"])})),they("should not prevent default keyboard action if an interactive $type elementis nested inside ng-click",i,function(r){function a(e){return"<"+e+"></"+e+">"}e('<section><div ng-click="onClick($event)">'+a(r)+"</div></section>");var n=(s.find("div"),s.find(r));browserTrigger(n,"keydown",{cancelable:!0,bubbles:!0,keyCode:13}),expect(t).toEqual([r.toLowerCase()+"(false)"]),t=[],browserTrigger(n,"keydown",{cancelable:!0,bubbles:!0,keyCode:32}),expect(t).toEqual([r.toLowerCase()+"(false)"])}),they("should not bind to key events if there is existing `ng-$prop`",["keydown","keypress","keyup"],function(t){o.onKeyEvent=jasmine.createSpy("onKeyEvent"),e('<div ng-click="onClick()" ng-'+t+'="onKeyEvent()"></div>'),s.triggerHandler({type:t,keyCode:13}),s.triggerHandler({type:t,keyCode:32}),expect(o.onClick).not.toHaveBeenCalled(),expect(o.onKeyEvent).toHaveBeenCalledTimes(2)}),it("should update bindings when keydown is handled",function(){o.count=0,e('<div ng-click="count = count + 1">Count: {{ count }}</div>'),expect(s.text()).toBe("Count: 0"),s.triggerHandler({type:"keydown",keyCode:13}),expect(s.text()).toBe("Count: 1"),s.triggerHandler({type:"keydown",keyCode:32}),expect(s.text()).toBe("Count: 2")}),it("should pass `$event` to `ng-click` handler as local",function(){e('<div ng-click="event = $event">{{ event.type }}{{ event.keyCode }}</div>'),expect(s.text()).toBe(""),s.triggerHandler({type:"keydown",keyCode:13}),expect(s.text()).toBe("keydown13"),s.triggerHandler({type:"keydown",keyCode:32}),expect(s.text()).toBe("keydown32")}),it("should not bind keydown to natively interactive elements",function(){e('<button ng-click="onClick()">Click me</button>'),s.triggerHandler({type:"keydown",keyCode:13}),s.triggerHandler({type:"keydown",keyCode:32}),expect(o.onClick).not.toHaveBeenCalled()})}),describe("actions when bindRoleForClick is set to false",function(){beforeEach(r({bindRoleForClick:!1})),beforeEach(n),it("should not add a button role",function(){e('<radio-group ng-click="something"></radio-group>'),expect(s.attr("role")).toBeUndefined()})}),describe("actions when bindKeydown is set to false",function(){beforeEach(r({bindKeydown:!1})),beforeEach(n),it("should not trigger click",function(){o.someAction=jasmine.createSpy("someAction"),s=l('<div ng-click="someAction()" tabindex="0"></div>')(o),s.triggerHandler({type:"keydown",keyCode:13}),s.triggerHandler({type:"keydown",keyCode:32}),s.triggerHandler({type:"keypress",keyCode:13}),s.triggerHandler({type:"keypress",keyCode:32}),s.triggerHandler({type:"keyup",keyCode:13}),s.triggerHandler({type:"keyup",keyCode:32}),expect(o.someAction).not.toHaveBeenCalled(),s.triggerHandler({type:"click",keyCode:32}),expect(o.someAction).toHaveBeenCalledOnce()})}),describe("tabindex when disabled",function(){beforeEach(r({tabindex:!1})),beforeEach(n),it("should not add a tabindex attribute",function(){e('<div role="button"></div>'),expect(s.attr("tabindex")).toBeUndefined(),e('<div role="checkbox"></div>'),expect(s.attr("tabindex")).toBeUndefined(),e('<div ng-click="someAction()"></div>'),expect(s.attr("tabindex")).toBeUndefined(),e('<div ng-dblclick="someAction()"></div>'),expect(s.attr("tabindex")).toBeUndefined()})}),describe("ngModel",function(){it("should not break when manually compiling",function(){module(function(e){e.directive("foo",function(){return{priority:10,terminal:!0,link:function(e,t){l(t,null,10)(e)}}})}),n(),e('<div role="checkbox" ng-model="value" foo />'),expect(s.attr("tabindex")).toBe("0")})})})}(window,window.angular);