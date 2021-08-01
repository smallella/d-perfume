/* lightbox maybe use*/ 
// lightbox.option({
//   'resizeDuration': 200,
//   'wrapAround': true,
//   'albumLabel': "Image %1 of %2",
//   'positionFromTop': 100,
//   'imageFadeDuration':600,
// });

// form validation
(function () {
    'use strict'
    var forms = document.querySelectorAll('.validation');
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
          event.preventDefault()
        }, false)
      })
  })()
  
 
  
//member.html password-form
var passwordBtn = document.querySelector('#passwordBtn');
  if(passwordBtn){
    passwordBtn.addEventListener("click", (e) => {
          var password = document.querySelector('#password');
          var newpassword = document.querySelector('#new-password');
          var confirm = document.querySelector('#confirm-password');
          if(!password.value || !newpassword.value || !confirm.value){
              return;
          }
      })
  }
  
  
//login.html login-form
  const logBtn = document.querySelector('#logBtn');
  console.log(logBtn);
  if(logBtn){
      logBtn.addEventListener("click", (e) => {
          const email = document.querySelector('#email');
          const password = document.querySelector('#password');
          const arr = email.value.split('@');
          if(!email.value || !password.value || !arr[1]){
              return;
          }
          //login success to member page
          window.location.href='./member.html';
      })
  }

//memberform-validaiton
(function() {
    validate.extend(validate.validators.datetime, {
      parse: function(value, options) {
        return +moment.utc(value);
      },
      format: function(value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
      }
    });
    var constraints = {
      "電子信箱": {  
        presence:  {
          message: "此為必填的欄位!"
        }, 
        email: true // 需要符合 email 格式
      },
      //login-form default
      "舊密碼": {
        presence: {
          message: "此為必填的欄位!"
        }, 
        length: {
          minimum: 5, // 長度5<12
          maximum: 12, 
          message: "^密碼長度需介於5~12間"
        },
      },
      "新密碼": {
        presence: {
          message: "此為必填的欄位!"
        }, 
        length: {
          minimum: 5, // 長度大於 ５
          maximum: 12, // 長度小於 12
          message: "^密碼長度需介於5~12間"
        },
      },
      "確認密碼": {  
        presence: {
          message: "此為必填的欄位!"
        },
        equality: {
          attribute: "新密碼",// 此欄位要和密碼欄位一樣
          message: "^密碼不相同 ! 請洽 d'perfume 服務人員"
        }
      },
      //member-form default
      "會員姓名": {
        presence: {
          message: "此為必填的欄位!"
        }, 
        length: {
          minimum: 2, // 名稱長度要超過2 形式不拘 
        },
        // format: {
        //   pattern: "[a-z0-9]+", // 只能填入英文或數字
        //   flags: "i",// 大小寫不拘
        //   message: "只能包含 a-z 和 0-9"
        // }
      },
      "聯絡地址": {
        presence: {
          message: "此為必填的欄位!"
        }, 
        inclusion: {
            within: ["TW"],  // 只有在within的才驗證通過
            message: "^抱歉!目前只提供服務給台灣和離島"
          }
      },
      "配送地址": {
        presence: {
          message: "此為必填的欄位!"
        }, 
        inclusion: {
          within: ["TW"],  // 只有在within的才驗證通過
          message: "^抱歉!目前只提供服務給台灣和離島"
        }
      },
      "輸入地址": {
        presence: {
          message: "此為必填的欄位!"
        }, 
      },
      "輸入配送地址": {
        presence: {
          message: "此為必填的欄位!"
        }, 
      },
      "手機號碼": {
        presence:{
          message: "此為必填的欄位!"
        },
        format: {
            pattern: "^09\\d{8}$", // 需輸入0~92位數 加上8位任意數
            message: "格式錯誤 需為10位的正確數字 !"
        }
      },
    };

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form#memberform");
    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      handleFormSubmit(form);
    });
    
    // 監聽 input 值改變的狀況
    var inputs = document.querySelectorAll("input, textarea, select")
    for (var i = 0; i < inputs.length; ++i) {
      inputs.item(i).addEventListener("change", function(ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name])
      });
    }

    // 沒有錯誤就顯示成功傳送
    function handleFormSubmit(form, input) {
      var errors = validate(form, constraints);// validate the form aainst the constraints
      showErrors(form, errors || {}); // then we update the form to reflect the results
      if (!errors) {
        showSuccess();
        window.location.href='./product.html';
      }
    }

    // Updates the inputs with the validation errors
    function showErrors(form, errors) {
      // We loop through all the inputs and show the errors for that input
      _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
        // Since the errors can be null if no errors were found we need to handle
        // that
        showErrorsForInput(input, errors && errors[input.name]);
      });
    }

    // Shows the errors for a specific input
    function showErrorsForInput(input, errors) {
      // This is the root of the input
      var formGroup = closestParent(input.parentNode, "form-group")
        // Find where the error messages will be insert into
        , messages = formGroup.querySelector(".messages");
      // First we remove any old messages and resets the classes
      resetFormGroup(formGroup);
      // If we have errors
      if (errors) {
        // we first mark the group has having errors
        formGroup.classList.add("has-error");
        // then we append all the errors
        _.each(errors, function(error) {
          addError(messages, error);
        });
      } else {
        // otherwise we simply mark it as success
        formGroup.classList.add("has-success");
      }
    }

    // Recusively finds the closest parent that has the specified class
    function closestParent(child, className) {
      if (!child || child == document) {
        return null;
      }
      if (child.classList.contains(className)) {
        return child;
      } else {
        return closestParent(child.parentNode, className);
      }
    }

    function resetFormGroup(formGroup) {
      // Remove the success and error classes
      formGroup.classList.remove("has-error");
      formGroup.classList.remove("has-success");
      // and remove any old messages
      _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
        el.parentNode.removeChild(el);
      });
    }

    // Adds the specified error with the following markup
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
      var block = document.createElement("p");
      block.classList.add("help-block");
      block.classList.add("error");
      block.innerText = error;
      console.log(block);
      messages.appendChild(block);
    }
    function showSuccess() {
      alert("Success!"); // We made it \:D/
    }
  })();