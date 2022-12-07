var vhCSS = false,
  el = null,
  result = null;

/* функция — загрузка дополнительных CSS-файлов в шапку HTML-кода */
function loadCSS(source, type) {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  /* получение объекта (элемента) по имени тега (head) — первый найденный [0] */
  let s = document.getElementsByTagName("head")[0];
  /* получение элемента (link) */
  let sc = document.createElement("link");
  /* назначение атрибутов для созданного элемента (link) */
  sc.rel = type;
  sc.href = source;
  /* разместить созданный элемент (link — [sc]) со всеми назначенными атрибутами в полученном объекте (head — [s]) */
  s.appendChild(sc);
  return false;
}

/* функция — вызывается после того, как документ полностью загружен */
function isReady() {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  /* переменная (vh) — расчет реальной высоты рабочей области (важно для смартфонов) */
  let vh = $(window).innerHeight() * 0.01;
  /* устанавливаем свойство для всего документа (html) исходя из расчета реальной высоты */
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  /* если дополнительный CSS-файл еще не был загружен (переменная vhCSS = FALSE) */
  if (!vhCSS) {
    /* загружаем дополнительный CSS-файл */
    loadCSS("css/vh.css?" + $.now(), "stylesheet");
    /* дополнительный CSS-файл успешно загружен (назначение переменной vhCSS значения — TRUE) */
    vhCSS = true;
  }

  /* найден блок «рабочая область» (workspace) и открыта боковая навигация */
  if ($(".wrapper").length && $(".wrapper").hasClass("navigation")) {
    /* закрываем боковую навигация */
    $(".wrapper").removeClass("navigation");
  }

  /* найден блок «рабочая область» (workspace) и открыта боковая навигация */
  if ($(".wrapper").length && $(".wrapper").hasClass("conversion")) {
    /* закрываем боковую навигация */
    $(".wrapper").removeClass("conversion");
  }

  return false;
}

/* функция — удаление значений (сброс) полей ВЕБ-формы с классом field */
function isClear(el) {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  el.each(function () {
    if ($(this).val()) {
      $(this).val("");
    }
    if ($(this).next("span").hasClass("selected")) {
      $(this).next("span").removeClass("selected");
    }
    if ($(this).hasClass("error")) {
      $(this).removeClass("error");
    }
    if ($(this).hasClass("success")) {
      $(this).removeClass("success");
    }
  });
  return false;
}

/* функция — правило для проверки корректности заполнения поля «Имя» */
function isName(name) {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  let regex = new RegExp(/^([а-яА-Яa-zA-Z][а-яА-Яa-zA-Z\- ]{1,20})+$/);
  return regex.test(name);
}

/* функция — правило для проверки корректности заполнения поля «E-mail» */
function isEmail(email) {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  let regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return regex.test(email);
}

/* функция — проверка корректности заполнения полей ВЕБ-формы по правилам */
function isCheck(el) {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  if ($(el).data("check")) {
    if ($(el).data("check") === "name") {
      result = isName($(el).val());
    }
    if ($(el).data("check") === "email") {
      result = isEmail($(el).val());
    }
    if (!result) {
      if ($(el).hasClass("success")) {
        $(el).removeClass("success");
      }
      $(el).addClass("error");
    } else {
      if ($(el).hasClass("error")) {
        $(el).removeClass("error");
      }
      $(el).addClass("success");
    }
  }
  return false;
}

function isRequire(classname) {
  "use strict";
  if ($("div.form." + classname + " input.error").length > 0) {
    if ($("button.action." + classname).hasClass("active")) {
      $("button.action." + classname).removeClass("active");
    }
  } else {
    if ($("div.form." + classname + " label.required > input").length !== $("div.form." + classname + " label.required > input.success").length) {
      if ($("button.action." + classname).hasClass("active")) {
        $("button.action." + classname).removeClass("active");
      }
    } else {
      if (!$("button.action." + classname).hasClass("active")) {
        $("button.action." + classname).addClass("active");
      }
    }
  }
  return false;
}

/* код внутри запущен когда страница будет полностью загружена, включая все фреймы, объекты и изображения */
$(window).on("load", function () {
  /* обрабатывать код в «строгом режиме» */
  "use strict";

  /* запрет масштабирования пальцами */
  document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  }, {
    passive: false
  });

  /* событие (on) клик (click) по элементу с классом action, который находится где-то внутри документа (document) */
  $(document).on("touchend mouseup", ".action", function (e) {
    /* элементу с классом action назначен атрибут data-action */
    if ($(this).data("action")) {

      /* открыть навигацию */
      if ($(this).data("action") === "navigation") {
        if (!$(".wrapper").hasClass("navigation")) {
          $(".wrapper").addClass("navigation");
        }
      }

      /* открыть ВЕБ-форму */
      if ($(this).data("action") === "conversion") {
        if (!$(".wrapper").hasClass("conversion")) {
          $(".wrapper").addClass("conversion");
        }
      }

      /* кнопка «закрыть» */
      if ($(this).data("action") === "close") {
        $(".wrapper").removeClass().addClass("wrapper");
      }

      /* отправить ВЕБ-форму */
      if ($(this).data("action") === "form") {
        if ($("div.form." + $(this).data("form")).hasClass("shake")) {
          $("div.form." + $(this).data("form")).removeClass("shake");
        }
        /* поля ВЕБ-формы не содержат ошибок */
        if ($(this).hasClass("active")) {
          /* ВЕБ-форма еще не отправлена (отсутствует класс success) */
          if (!$("div.form." + $(this).data("form")).hasClass("success")) {
            /* ВЕБ-форма успешно отправлена */
            $("div.form." + $(this).data("form")).addClass("success");
            /* isForm($(this).data("form")); */
          }
        }
        /* одно или несколько полей ВЕБ-формы заполнены некорректно */
        else {
          /* поиск полей (элементов) с ошибками */
          $("div.form." + $(this).data("form") + " > div > form > ul > li > div > label.required > input").each(function () {
            /* вызов функции — проверка корректности заполнения полей ВЕБ-формы по правилам */
            isCheck(this);
          });
          $("div.form." + $(this).data("form")).addClass("shake");
        }
      }
    }
    /* отмена события, если его можно отменить */
    e.preventDefault();
  });

  /* проверка корректности заполнения полей ВЕБ-форм */
  $(document).on("propertychange change click keyup input paste", ".field", function (e) {
    el = this;
    setTimeout(function () {
      if (!$(el).val()) {
        if ($(el).parent("label").hasClass("selected")) {
          $(el).parent("label").removeClass("selected");
        }
        if ($(el).hasClass("error")) {
          $(el).removeClass("error");
        }
        if ($(el).hasClass("success")) {
          $(el).removeClass("success");
        }
        if ($(el).hasClass("selected")) {
          $(el).removeClass("selected");
        }
      } else {
        if (!$(el).parent("label").hasClass("selected")) {
          $(el).parent("label").addClass("selected");
        }
        /* вызов функции — проверка корректности заполнения полей ВЕБ-формы по правилам */
        isCheck(el);
      }
      isRequire($(el).data("form"));
    }, 100);
    e.preventDefault();
  });

  /* вызов функции — удаление значений (сброс) полей ВЕБ-формы с классом field */
  isClear($(".field"));
  /* вызов функции — после того, как документ полностью загружен */
  isReady();
});

/* окно поменяло ориентацию горизонтально <——> вертикально */
$(window).on("orientationchange", function () {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  /* перезагрузить документ */
  location.reload();
});

/* окно поменяло размер */
$(window).on("resize", function () {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  /* повторный вызов функции — после того, как документ полностью загружен (корректировка отображения элементов) */
  isReady();
});
