sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("userinfo.controller.View1", {
			onInit: function () {
                var xhr;                
                xhr          = new XMLHttpRequest();

                xhr.addEventListener("readystatechange", function () {
                    console.log(this);
                });
                xhr.open("GET", "/user-api/currentUser", false);
                xhr.send();

                this.doSomethingUserDetails();
            },

            doSomethingUserDetails: async function() {
                const oUserInfo = await this.getUserInfoService();
                const sUserId = oUserInfo.getId(); // And in SAPUI5 1.86, those became public: .getEmail(), .getFirstName(), .getLastName(), .getFullName(), ... 
                // ...
            },

            
            getUserInfoService: function() {
                return new Promise(resolve => sap.ui.require([
                    "sap/ushell/library"
                ], oSapUshellLib => {
                    const oContainer = oSapUshellLib.Container;
                    console.log(oContainer);
                    const pService = oContainer.getServiceAsync("UserInfo"); // .getService is deprecated!
                    resolve(pService);
                }));
            },
		});
	});
