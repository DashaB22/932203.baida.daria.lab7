window.addEventListener('load', function () {
    var canvas = document.getElementById('graph');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d');
    var circles = [];
    let Kub_figure = document.getElementById('button_Kub');
    let Triangle_figure = document.getElementById('button_Triangle');
    let Circle_figure = document.getElementById('button_Сircle');
    demoButtonJsCreateButtonIn(Kub_figure, context, canvas, canvas.width, canvas.height, circles);
    demoButtonJsCreateButtonIn(Triangle_figure, context, canvas, canvas.width, canvas.height, circles);
    demoButtonJsCreateButtonIn(Circle_figure, context, canvas, canvas.width, canvas.height, circles);
    canvas.addEventListener('click', repaintClick.bind(null, circles, canvas, context));
    canvas.addEventListener('dblclick', deleteDoubleClick.bind(null, circles, canvas, context));
  });
  
  function deleteDoubleClick(circles, canvas, context, e) {
    var click_figure = false;
    var printAreaCircle = false;
    var printAreaTriangle = false;
    var printAreaSquare = false;
    var new_figure = [];
    let arr_figure = [];
    const arrayWithoutDeleteFigure = [];
    var previousSelectedCircle;
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;
    for (var i = circles.length - 1; i >= 0; i--) {
      var circle = circles[i];
      var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2));
      if (circle.radius) {
        if ((distanceFromCenter <= circle.radius) && (!click_figure)) {
          var j = circles.length - 1;
          var s = 0;
          while (j != i) {
            arrayWithoutDeleteFigure[s] = circles[j];
            circles.pop();
            j--;
            s++;
          }
          s--;
          circles.pop();
          while (s >= 0) {
            circles.push(arrayWithoutDeleteFigure[s]);
            s--;
          }
          i = -1;
          click_figure = true;
        }
      } else if (circle.distance) {
        if (((clickX - circle.x) * (clickX - (circle.x + circle.distance)) <= 0 && ((clickY - circle.y) * (clickY - (circle.y + circle.distance)) <= 0)) && !click_figure) {
          var j = circles.length - 1;
          var s = 0;
          while (j != i) {
            arrayWithoutDeleteFigure[s] = circles[j];
            circles.pop();
            j--;
            s++;
          }
          s--;
          circles.pop();
          while (s >= 0) {
            circles.push(arrayWithoutDeleteFigure[s]);
            s--;
          }
          i = -1;
          click_figure = true;
        }
      } else if (circle.length_side) {
        var posY = Math.sqrt(3);
        let p = circle.length_side * posY / 2;
        var a = (circle.x - clickX) * (circle.y - circle.y) - (circle.x + circle.length_side - circle.x) * (circle.y - clickY);
        var b = (circle.x + circle.length_side - clickX) * (circle.y - p - circle.y) - (circle.x + circle.length_side / 2 - circle.x - circle.length_side) * (circle.y - clickY);
        var c = (circle.x + circle.length_side / 2 - clickX) * (circle.y - circle.y + p) - (circle.x - circle.x - circle.length_side / 2) * (circle.y - p - clickY);
        if (((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0)) && (!click_figure)) {
          var j = circles.length - 1;
          var s = 0;
          while (j != i) {
            arrayWithoutDeleteFigure[s] = circles[j];
            circles.pop();
            j--;
            s++;
          }
          s--;
          circles.pop();
          while (s >= 0) {
            circles.push(arrayWithoutDeleteFigure[s]);
            s--;
          }
          i = -1;
          click_figure = true;
        }
      }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = circles.length - 1; i >= 0; i--) {
      var circle = circles[i];
      if (circle.radius) {
        if (printAreaSquare) {
          printAreaSquare = false;
          arr_figure.push(new_figure);
          new_figure = [];
        } else if (printAreaTriangle) {
          printAreaTriangle = false;
          arr_figure.push(new_figure);
          new_figure = [];
        }
        printAreaCircle = true;
        new_figure.push(circle);
      } else if (circle.distance) {
        if (printAreaCircle) {
          printAreaCircle = false;
          arr_figure.push(new_figure);
          new_figure = [];
        } else if (printAreaTriangle) {
          printAreaTriangle = false;
          arr_figure.push(new_figure);
          new_figure = [];
        }
        printAreaSquare = true;
        new_figure.push(circle);
      } else if (circle.length_side) {
        if (printAreaCircle) {
          printAreaCircle = false;
          arr_figure.push(new_figure);
          new_figure = [];
        } else if (printAreaSquare) {
          printAreaSquare = false;
          arr_figure.push(new_figure);
          new_figure = [];
        }
        printAreaTriangle = true;
        new_figure.push(circle);
      }
    }
    if (printAreaCircle) {
      printAreaCircle = false;
      arr_figure.push(new_figure);
    } else if (printAreaTriangle) {
      printAreaTriangle = false;
      arr_figure.push(new_figure);
    } else if (printAreaSquare) {
      printAreaSquare = false;
      arr_figure.push(new_figure);
    }
    for (var i = arr_figure.length - 1; i >= 0; i--) {
      var figure = arr_figure[i];
      if (figure[0].length_side) {
        DrawTriangle(context, figure);
      } else if (figure[0].radius) {
        DrawCircle(context, figure);
      } else if (figure[0].distance) {
        DrawSquare(context, figure);
      }
    }
  }
  
  function repaintClick(circles, canvas, context, e) {
    var click_figure = false;
    var printAreaCircle = false;
    var printAreaTriangle = false;
    var printAreaSquare = false;
    var new_figure = [];
    let arr_figure = [];
    var previousSelectedCircle;
    context.clearRect(0, 0, canvas.width, canvas.height);
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;
    for (var i = circles.length - 1; i >= 0; i--) {
      var circle = circles[i];
      var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2));
      if (circle.radius) {
        if (printAreaSquare) {
          printAreaSquare = false;
          arr_figure.push(new_figure);
          new_figure = [];
        } else if (printAreaTriangle) {
          printAreaTriangle = false;
          arr_figure.push(new_figure);
          new_figure = [];
        }
        printAreaCircle = true;
        if ((distanceFromCenter <= circle.radius) && (!click_figure)) {
          var color = '#30d5c8';
          var new_circle = new Circle(circle.x, circle.y, circle.radius, color);
          new_figure.push(new_circle);
          circles[i] = new_circle;
          click_figure = true;
          arr_figure.push(new_figure);
          printAreaCircle = false;
          new_figure = [];
        } else {
          new_figure.push(circle);
        }
      } else if (circle.distance) {
        if (printAreaCircle) {
          printAreaCircle = false;
          arr_figure.push(new_figure);
          new_figure = [];
        } else if (printAreaTriangle) {
          printAreaTriangle = false;
          arr_figure.push(new_figure);
          new_figure = [];
        }
        printAreaSquare = true;
        if (((clickX - circle.x) * (clickX - (circle.x + circle.distance)) <= 0 && ((clickY - circle.y) * (clickY - (circle.y + circle.distance)) <= 0)) && !click_figure) {
          var color = '#30d5c8';
          var square = new Square(circle.x, circle.y, circle.distance, color);
          new_figure.push(square);
          circles[i] = square;
          click_figure = true;
          arr_figure.push(new_figure);
          printAreaSquare = false;
          new_figure = [];
        } else {
          new_figure.push(circle);
        }
      } else if (circle.length_side) {
        if (printAreaCircle) {
          printAreaCircle = false;
          arr_figure.push(new_figure);
          new_figure = [];
        } else if (printAreaSquare) {
          printAreaSquare = false;
          arr_figure.push(new_figure);
          new_figure = [];
        }
        printAreaTriangle = true;
        var posY = Math.sqrt(3);
        let p = circle.length_side * posY / 2;
        var a = (circle.x - clickX) * (circle.y - circle.y) - (circle.x + circle.length_side - circle.x) * (circle.y - clickY);
        var b = (circle.x + circle.length_side - clickX) * (circle.y - p - circle.y) - (circle.x + circle.length_side / 2 - circle.x - circle.length_side) * (circle.y - clickY);
        var c = (circle.x + circle.length_side / 2 - clickX) * (circle.y - circle.y + p) - (circle.x - circle.x - circle.length_side / 2) * (circle.y - p - clickY);
        if (((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0)) && (!click_figure)) {
          var color = '#30d5c8';
          var new_triangle = new Triangle(circle.x, circle.y, circle.length_side, color);
          new_figure.push(new_triangle);
          circles[i] = new_triangle;
          click_figure = true;
          arr_figure.push(new_figure);
          printAreaTriangle = false;
          new_figure = [];
        } else {
          new_figure.push(circle);
        }
      }
    }
    if (printAreaCircle) {
      printAreaCircle = false;
      arr_figure.push(new_figure);
    } else if (printAreaTriangle) {
      printAreaTriangle = false;
      arr_figure.push(new_figure);
    } else if (printAreaSquare) {
      printAreaSquare = false;
      arr_figure.push(new_figure);
    }
    for (var i = arr_figure.length - 1; i >= 0; i--) {
      var figure = arr_figure[i];
      if (figure[0].length_side) {
        DrawTriangle(context, figure);
      } else if (figure[0].radius) {
        DrawCircle(context, figure);
      } else if (figure[0].distance) {
        DrawSquare(context, figure);
      }
    }
  }
  
  function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isSelected = false;
  }
  
  function Triangle(x, y, dist, color) {
    this.x = x;
    this.y = y;
    this.length_side = dist;
    this.color = color;
    this.isSelected = false;
  }
  
  function Square(x, y, dist, color) {
    this.x = x;
    this.y = y;
    this.distance = dist;
    this.color = color;
    this.isSelected = false;
  }
  
  function DrawTriangle(context, triangles) {
    for (var i = 0; i < triangles.length; i++) {
      var triangle = triangles[i];
      var posY = Math.sqrt(3);
      let p = triangle.length_side * posY / 2;
      context.globalAlpha = 0.85;
      context.beginPath();
      context.moveTo(triangle.x, triangle.y);
      context.lineTo(triangle.x + triangle.length_side, triangle.y);
      context.lineTo(triangle.x + triangle.length_side / 2, triangle.y - p);
      context.closePath(); // Замыкаем путь
      context.fillStyle = triangle.color;
      context.strokeStyle = "black";
      if (triangle.isSelected) {
        context.fillStyle = '#99ff99';
      }
      context.fill();
      context.stroke();
    }
  }
  
  function DrawSquare(context, squares) {
    for (var i = 0; i < squares.length; i++) {
      var square = squares[i];
      context.globalAlpha = 0.85;
      context.beginPath();
      context.moveTo(square.x, square.y);
      context.lineTo(square.x + square.distance, square.y);
      context.lineTo(square.x + square.distance, square.y + square.distance);
      context.lineTo(square.x, square.y + square.distance);
      context.closePath(); // Замыкаем путь
      context.fillStyle = square.color;
      context.strokeStyle = "black";
      if (square.isSelected) {
        context.fillStyle = '#99ff99';
      }
      context.fill();
      context.stroke();
    }
  }
  
  function DrawCircle(context, circles) {
    for (var i = 0; i < circles.length; i++) {
      var circle = circles[i];
      context.globalAlpha = 0.85;
      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      context.fillStyle = circle.color;
      context.strokeStyle = "black";
      if (circle.isSelected) {
        context.fillStyle = '#99ff99';
      }
      context.fill();
      context.stroke();
    }
  }
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  function demoButtonJsCreateButtonIn(enterWrapper, context, canvas, canvasWidth, canvasHeight, circles) {
    const btn = document.createElement('button');
    if (enterWrapper.id == "button_Kub") {
      btn.innerHTML = 'Квадрат';
    } else if (enterWrapper.id == "button_Triangle") {
      btn.innerHTML = 'Треугольник';
    } else if (enterWrapper.id == "button_Сircle") {
      btn.innerHTML = 'Круг';
    }
    btn.onclick = function () {
      var url = document.getElementById('text');
      let val = url.value;
      if (val > 200) val = 200;
      for (let i = 0; i < val; i++) {
        let size = getRandomNumber(20, 300);
        var positionx = getRandomNumber(size, canvasWidth - size);
        var positiony = getRandomNumber(size, canvasHeight - size);
        var color = '#ff0000';
        if (btn.innerHTML == 'Квадрат') {
          color = '#ff0000';
          var square = new Square(positionx, positiony, size, color);
          circles.push(square);
        } else if (btn.innerHTML == 'Треугольник') {
          color = '#1a2edb';
          var triangle = new Triangle(positionx, positiony, size, color);
          circles.push(triangle);
        } else if (btn.innerHTML == 'Круг') {
          color = '#008000';
          var circle = new Circle(positionx, positiony, size, color);
          circles.push(circle);
        }
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        if (circle.length_side) {
          DrawTriangle(context, [circle]);
        } else if (circle.radius) {
          DrawCircle(context, [circle]);
        } else if (circle.distance) {
          DrawSquare(context, [circle]);
        }
      }
    };
    enterWrapper.appendChild(btn);
  }