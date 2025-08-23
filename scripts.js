
        // Crear partículas animadas
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Datos del formulario y cálculos
        let currentData = {};

        document.getElementById('nutritionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            currentData = {
                name: formData.get('name'),
                age: parseInt(formData.get('age')),
                gender: formData.get('gender'),
                weight: parseFloat(formData.get('weight')),
                height: parseInt(formData.get('height'))
            };
            
            calculateIMC(currentData);
        });

        function calculateIMC(data) {
            const heightInMeters = data.height / 100;
            const imc = data.weight / (heightInMeters * heightInMeters);
            
            let classification = '';
            let classificationClass = '';
            let recommendations = '';
            
            // Clasificación según edad (percentiles aproximados)
            if (data.age >= 5 && data.age <= 18) {
                if (imc < 15) {
                    classification = '⚠️ Bajo Peso Severo';
                    classificationClass = 'bajo-peso';
                    recommendations = '🍎 Necesita aumentar la ingesta calórica con alimentos nutritivos';
                } else if (imc < 18.5) {
                    classification = '📉 Bajo Peso';
                    classificationClass = 'bajo-peso';
                    recommendations = '🥑 Plan para incrementar peso de manera saludable';
                } else if (imc < 25) {
                    classification = '✅ Peso Normal';
                    classificationClass = 'peso-normal';
                    recommendations = '🌟 ¡Excelente! Plan para mantener hábitos saludables';
                } else if (imc < 30) {
                    classification = '📈 Sobrepeso';
                    classificationClass = 'sobrepeso';
                    recommendations = '🥗 Plan para reducir peso gradualmente';
                } else {
                    classification = '🚨 Obesidad';
                    classificationClass = 'obesidad';
                    recommendations = '👨‍⚕️ Plan especial supervisado por nutricionista';
                }
            }
            
            // Mostrar resultados
            document.getElementById('imcResult').innerHTML = `
                <strong>🎯 IMC Calculado: ${imc.toFixed(2)} kg/m²</strong>
            `;
            
            const classificationDiv = document.getElementById('classification');
            classificationDiv.textContent = classification;
            classificationDiv.className = `classification ${classificationClass}`;
            
            document.getElementById('recommendations').innerHTML = `
                <p style="text-align: center; font-size: 1.1rem; margin-top: 1rem;">
                    ${recommendations}
                </p>
            `;
            
            // Mostrar sección de resultados
            document.getElementById('results').style.display = 'block';
            
            // Generar menú personalizado
            generateMenu(classificationClass, data);
        }

        function generateMenu(classification, data) {
            const menus = {
                'bajo-peso': {
                    title: '🍯 Plan Nutritivo para Incrementar Peso',
                    days: [
                        {
                            day: 'Lunes',
                            meals: {
                                desayuno: '🥞 Pancakes de avena con miel + 🥛 Leche entera + 🍌 Plátano + 🥜 Nueces',
                                almuerzo: '🍗 Pollo a la plancha + 🍚 Arroz integral + 🥕 Zanahoria cocida + 🥑 Aguacate + 🫘 Frijoles',
                                cena: '🐟 Salmón al horno + 🥔 Puré de papa + 🥬 Ensalada verde + 🧀 Queso',
                                snacks: '🥜 Mix de frutos secos + 🧀 Queso + 🍪 Galletas integrales + 🥤 Batido'
                            }
                        },
                        {
                            day: 'Martes',
                            meals: {
                                desayuno: '🥣 Cereal integral + 🥛 Leche + 🍓 Fresas + 🍯 Miel + 🥜 Almendras',
                                almuerzo: '🥩 Carne magra + 🍝 Pasta integral + 🍅 Salsa de tomate + 🧀 Queso parmesano',
                                cena: '🥚 Tortilla de huevos + 🥖 Pan integral + 🥒 Pepino + 🍅 Tomate',
                                snacks: '🍎 Manzana con mantequilla de maní + 🥛 Batido de frutas + 🍪 Galletas'
                            }
                        },
                        {
                            day: 'Miércoles',
                            meals: {
                                desayuno: '🧇 Waffles integrales + 🍓 Frutos rojos + 🥛 Leche + 🍯 Miel',
                                almuerzo: '🐟 Pescado + 🍠 Camote asado + 🥦 Brócoli + 🥑 Aguacate',
                                cena: '🍗 Pollo + 🍚 Arroz con verduras + 🥬 Ensalada mixta',
                                snacks: '🧀 Yogur griego + 🍌 Plátano + 🥜 Granola + 🥤 Jugo natural'
                            }
                        },
                        {
                            day: 'Jueves',
                            meals: {
                                desayuno: '🥐 Pan tostado + 🥑 Aguacate + 🥚 Huevo + 🥛 Leche + 🍊 Naranja',
                                almuerzo: '🥩 Bistec + 🥔 Papas doradas + 🥕 Zanahorias + 🌽 Maíz',
                                cena: '🍝 Pasta con pollo + 🧀 Queso + 🥗 Ensalada caesar',
                                snacks: '🍇 Uvas + 🧀 Queso cottage + 🍪 Crackers + 🥛 Batido'
                            }
                        },
                        {
                            day: 'Viernes',
                            meals: {
                                desayuno: '🥣 Smoothie bowl + 🍌 Plátano + 🍓 Fresas + 🥜 Granola + 🥛 Leche',
                                almuerzo: '🐟 Salmón + 🍚 Quinoa + 🥦 Vegetales verdes + 🥑 Aguacate',
                                cena: '🍗 Pollo al curry + 🍚 Arroz basmati + 🥬 Espinacas',
                                snacks: '🥜 Trail mix + 🍎 Manzana + 🧀 Yogur + 🍯 Miel'
                            }
                        },
                        {
                            day: 'Sábado',
                            meals: {
                                desayuno: '🥞 Pancakes de plátano + 🥛 Leche + 🍓 Frutos rojos + 🥜 Nueces',
                                almuerzo: '🌮 Tacos de pollo + 🫘 Frijoles + 🥑 Guacamole + 🧀 Queso',
                                cena: '🐟 Pescado a la plancha + 🥔 Puré + 🥕 Verduras mixtas',
                                snacks: '🍌 Smoothie de plátano + 🥜 Granola + 🧀 Yogur + 🍪 Galletas'
                            }
                        },
                        {
                            day: 'Domingo',
                            meals: {
                                desayuno: '🧇 Waffles + 🍯 Miel + 🍓 Fresas + 🥛 Chocolate caliente',
                                almuerzo: '🍖 Asado + 🥔 Papas + 🥗 Ensalada completa + 🥖 Pan',
                                cena: '🍝 Pasta boloñesa + 🧀 Queso + 🥬 Ensalada verde',
                                snacks: '🍇 Frutas variadas + 🧀 Queso + 🥜 Frutos secos + 🥤 Jugo'
                            }
                        }
                    ]
                },
                'peso-normal': {
                    title: '🌟 Plan Equilibrado de Mantenimiento',
                    days: [
                        {
                            day: 'Lunes',
                            meals: {
                                desayuno: '🥣 Avena con frutas + 🥛 Leche descremada + 🥜 Nueces + 🍯 Miel',
                                almuerzo: '🐟 Pescado al horno + 🍚 Arroz integral + 🥦 Brócoli + 🥗 Ensalada',
                                cena: '🍗 Pechuga de pollo + 🥔 Papas al vapor + 🥬 Espinacas + 🍅 Tomate',
                                snacks: '🍎 Frutas frescas + 🧀 Yogur natural + 💧 Agua'
                            }
                        },
                        {
                            day: 'Martes',
                            meals: {
                                desayuno: '🍞 Pan integral + 🥑 Aguacate + 🥚 Huevo + 🍊 Jugo de naranja',
                                almuerzo: '🥩 Carne magra + 🍠 Camote + 🥕 Zanahorias + 🥒 Pepino',
                                cena: '🐟 Atún + 🍚 Quinoa + 🥦 Vegetales al vapor',
                                snacks: '🍌 Plátano + 🧀 Yogur + 🥜 Almendras + 💧 Agua'
                            }
                        },
                        {
                            day: 'Miércoles',
                            meals: {
                                desayuno: '🥣 Cereal integral + 🥛 Leche + 🍓 Frutos rojos + 🥜 Granola',
                                almuerzo: '🍗 Pollo a la plancha + 🍝 Pasta integral + 🍅 Salsa de tomate',
                                cena: '🐟 Pescado + 🥔 Papas hervidas + 🥬 Ensalada mixta',
                                snacks: '🍎 Manzana + 🧀 Queso cottage + 💧 Agua con limón'
                            }
                        },
                        {
                            day: 'Jueves',
                            meals: {
                                desayuno: '🧇 Waffle integral + 🍯 Miel + 🍓 Fresas + 🥛 Leche',
                                almuerzo: '🥩 Bistec magro + 🍚 Arroz + 🥦 Brócoli + 🥕 Zanahoria',
                                cena: '🍗 Pollo al horno + 🥔 Puré light + 🥬 Espinacas',
                                snacks: '🍇 Uvas + 🧀 Yogur + 🥜 Nueces + 💧 Agua'
                            }
                        },
                        {
                            day: 'Viernes',
                            meals: {
                                desayuno: '🥣 Smoothie de frutas + 🥜 Granola + 🥛 Leche descremada',
                                almuerzo: '🐟 Salmón + 🍚 Quinoa + 🥦 Vegetales + 🥑 Aguacate',
                                cena: '🍗 Pechuga + 🍝 Pasta integral + 🥗 Ensalada verde',
                                snacks: '🍊 Naranja + 🧀 Yogur + 💧 Agua infusionada'
                            }
                        },
                        {
                            day: 'Sábado',
                            meals: {
                                desayuno: '🥞 Pancakes integrales + 🍌 Plátano + 🥛 Leche + 🍯 Miel',
                                almuerzo: '🌮 Wrap de pollo + 🫘 Frijoles + 🥗 Ensalada + 🥑 Aguacate',
                                cena: '🐟 Pescado a la plancha + 🥔 Papas + 🥦 Verduras',
                                snacks: '🍎 Manzana + 🧀 Yogur griego + 🥜 Almendras'
                            }
                        },
                        {
                            day: 'Domingo',
                            meals: {
                                desayuno: '🍞 Tostadas integrales + 🥑 Aguacate + 🥚 Huevo + 🍅 Tomate',
                                almuerzo: '🍖 Pollo asado + 🍚 Arroz + 🥗 Ensalada completa',
                                cena: '🍝 Pasta con vegetales + 🧀 Queso + 🥬 Ensalada',
                                snacks: '🍓 Frutos rojos + 🧀 Yogur + 💧 Agua'
                            }
                        }
                    ]
                },
                'sobrepeso': {
                    title: '🥗 Plan Balanceado para Reducir Peso',
                    days: [
                        {
                            day: 'Lunes',
                            meals: {
                                desayuno: '🥣 Avena integral + 🍓 Frutos rojos + 🥛 Leche descremada + 💧 Agua',
                                almuerzo: '🥗 Ensalada grande + 🐟 Atún + 🥑 Aguacate + 🍅 Tomate + 🥒 Pepino',
                                cena: '🥦 Verduras al vapor + 🍗 Pollo a la plancha + 🥬 Ensalada verde',
                                snacks: '🥕 Bastones de zanahoria + 🍎 Manzana + 💧 Agua con limón'
                            }
                        },
                        {
                            day: 'Martes',
                            meals: {
                                desayuno: '🍞 Pan integral (1 rebanada) + 🥚 Huevo + 🍅 Tomate + 🥒 Pepino',
                                almuerzo: '🥗 Ensalada de pollo + 🥦 Brócoli + 🥕 Zanahoria + 🍋 Limón',
                                cena: '🐟 Pescado al vapor + 🥬 Espinacas + 🍅 Tomate cherry',
                                snacks: '🥒 Pepino + 🧀 Yogur natural bajo en grasa + 💧 Agua'
                            }
                        },
                        {
                            day: 'Miércoles',
                            meals: {
                                desayuno: '🥣 Yogur natural + 🍓 Fresas + 🥜 Granola light + ☕ Té verde',
                                almuerzo: '🍗 Pechuga de pollo + 🥦 Vegetales mixtos + 🍚 Arroz integral (porción pequeña)',
                                cena: '🥗 Ensalada abundante + 🐟 Pescado + 🍋 Aderezo de limón',
                                snacks: '🍎 Manzana + 🥕 Zanahorias baby + 💧 Agua abundante'
                            }
                        },
                        {
                            day: 'Jueves',
                            meals: {
                                desayuno: '🥣 Smoothie verde + 🥬 Espinacas + 🍌 Plátano + 🥛 Leche descremada',
                                almuerzo: '🥗 Bowl de vegetales + 🍗 Pollo + 🥑 Aguacate (poco) + 🍅 Tomate',
                                cena: '🐟 Atún + 🥦 Brócoli + 🥒 Pepino + 🥬 Lechuga',
                                snacks: '🍊 Naranja + 🥒 Apio + 💧 Agua con pepino'
                            }
                        },
                        {
                            day: 'Viernes',
                            meals: {
                                desayuno: '🍞 Pan integral + 🥑 Aguacate (poco) + 🍅 Tomate + ☕ Té verde',
                                almuerzo: '🥗 Ensalada de atún + 🥦 Vegetales + 🥕 Zanahoria + 🍋 Limón',
                                cena: '🍗 Pollo a la plancha + 🥬 Ensalada verde + 🥒 Pepino',
                                snacks: '🍎 Manzana verde + 🧀 Yogur light + 💧 Agua'
                            }
                        },
                        {
                            day: 'Sábado',
                            meals: {
                                desayuno: '🥣 Avena con agua + 🍓 Frutos rojos + 🍯 Miel (poca) + ☕ Té',
                                almuerzo: '🥗 Ensalada césar light + 🍗 Pollo + 🥦 Vegetales verdes',
                                cena: '🐟 Pescado al vapor + 🥬 Espinacas + 🍅 Tomate',
                                snacks: '🥕 Vegetales crudos + 🧀 Yogur natural + 💧 Agua'
                            }
                        },
                        {
                            day: 'Domingo',
                            meals: {
                                desayuno: '🥣 Yogur griego + 🍓 Fresas + 🥜 Granola light + ☕ Café sin azúcar',
                                almuerzo: '🥗 Bowl de vegetales + 🍗 Pechuga + 🥒 Pepino + 🍋 Limón',
                                cena: '🐟 Pescado + 🥦 Brócoli + 🥬 Ensalada mixta',
                                snacks: '🍎 Fruta + 🥒 Vegetales + 💧 Agua infusionada'
                            }
                        }
                    ]
                },
                'obesidad': {
                    title: '👨‍⚕️ Plan Especial Supervisado',
                    days: [
                        {
                            day: 'Lunes',
                            meals: {
                                desayuno: '🥣 Avena pequeña + 🍓 Frutos del bosque + 💧 Agua + ☕ Té verde',
                                almuerzo: '🥗 Ensalada abundante + 🐟 Pescado magro + 🥦 Vegetales + 🍋 Limón',
                                cena: '🥬 Sopa de verduras + 🍗 Proteína magra + 🥒 Ensalada verde',
                                snacks: '🥕 Vegetales crudos + 💧 Mucha agua + 🍃 Té verde'
                            }
                        },
                        {
                            day: 'Martes',
                            meals: {
                                desayuno: '🥣 Yogur natural light + 🍓 Fresas + ☕ Té sin azúcar + 💧 Agua',
                                almuerzo: '🥗 Ensalada mixta + 🍗 Pechuga de pollo + 🥦 Brócoli + 🍅 Tomate',
                                cena: '🐟 Pescado al vapor + 🥬 Espinacas + 🥒 Pepino + 🍋 Limón',
                                snacks: '🥒 Apio + 🥕 Zanahoria + 💧 Agua con limón + 🍃 Té'
                            }
                        },
                        {
                            day: 'Miércoles',
                            meals: {
                                desayuno: '🍃 Té verde + 🍊 Naranja + 🥚 Clara de huevo + 💧 Agua',
                                almuerzo: '🥗 Bowl de vegetales + 🐟 Atún + 🥦 Vegetales verdes + 🍋 Aderezo light',
                                cena: '🥬 Sopa de verduras + 🍗 Pollo + 🥒 Ensalada + 🍅 Tomate',
                                snacks: '🥕 Vegetales + 🍎 Manzana verde + 💧 Agua abundante'
                            }
                        },
                        {
                            day: 'Jueves',
                            meals: {
                                desayuno: '🥣 Smoothie verde + 🥬 Espinacas + 🍋 Limón + 💧 Agua + ☕ Té',
                                almuerzo: '🥗 Ensalada grande + 🍗 Pollo + 🥦 Brócoli + 🥒 Pepino',
                                cena: '🐟 Pescado + 🥬 Vegetales + 🍅 Tomate + 🍋 Limón',
                                snacks: '🥒 Pepino + 🍎 Manzana + 💧 Agua con pepino'
                            }
                        },
                        {
                            day: 'Viernes',
                            meals: {
                                desayuno: '🍃 Infusión + 🍓 Frutos rojos + 🥚 Clara + 💧 Agua',
                                almuerzo: '🥗 Ensalada de atún + 🥦 Vegetales + 🥕 Zanahoria + 🍋 Limón',
                                cena: '🍗 Pechuga + 🥬 Ensalada verde + 🥒 Pepino + 🍅 Tomate',
                                snacks: '🥕 Vegetales crudos + 💧 Agua + 🍃 Té verde'
                            }
                        },
                        {
                            day: 'Sábado',
                            meals: {
                                desayuno: '🥣 Yogur light + 🍓 Fresas + ☕ Té sin azúcar + 💧 Agua',
                                almuerzo: '🥗 Bowl vegetal + 🐟 Pescado + 🥦 Brócoli + 🍋 Aderezo',
                                cena: '🥬 Sopa + 🍗 Proteína magra + 🥒 Ensalada mixta',
                                snacks: '🍎 Fruta + 🥒 Vegetales + 💧 Agua infusionada'
                            }
                        },
                        {
                            day: 'Domingo',
                            meals: {
                                desayuno: '🍃 Té verde + 🍊 Cítricos + 🥚 Huevo + 💧 Agua',
                                almuerzo: '🥗 Ensalada completa + 🍗 Pollo + 🥦 Vegetales + 🍋 Limón',
                                cena: '🐟 Pescado + 🥬 Espinacas + 🥒 Pepino + 🍅 Tomate',
                                snacks: '🥕 Vegetales + 💧 Agua abundante + 🍃 Infusión'
                            }
                        }
                    ]
                }
            };

            const selectedMenu = menus[classification] || menus['peso-normal'];
            
            let menuHTML = `<h3 style="text-align: center; color: #2e7d32; margin-bottom: 2rem;">${selectedMenu.title}</h3>`;
            
            // Mostrar todos los 7 días completos con menús diferentes
            selectedMenu.days.forEach((dayMenu, index) => {
                menuHTML += `
                    <div class="menu-day" style="animation-delay: ${index * 0.2}s;">
                        <h4>🗓️ ${dayMenu.day}</h4>
                        <div class="meal">
                            <strong>🌅 Desayuno:</strong> ${dayMenu.meals.desayuno}
                        </div>
                        <div class="meal">
                            <strong>☀️ Almuerzo:</strong> ${dayMenu.meals.almuerzo}
                        </div>
                        <div class="meal">
                            <strong>🌙 Cena:</strong> ${dayMenu.meals.cena}
                        </div>
                        <div class="meal">
                            <strong>🍎 Snacks:</strong> ${dayMenu.meals.snacks}
                        </div>
                    </div>
                `;
            });
            
            document.getElementById('menuContent').innerHTML = menuHTML;
            document.getElementById('menuSection').style.display = 'block';
        }

        function descargarPlanComoPDF() {
    // Obtén los datos a mostrar
    const nombre = currentData.name;
    const edad = currentData.age;
    const sexo = currentData.gender;
    const peso = currentData.weight;
    const estatura = currentData.height;
    const imc = document.getElementById('imcResult').innerHTML;
    const clasificacion = document.getElementById('classification').innerHTML;
    const recomendaciones = document.getElementById('recommendations').innerHTML;
    const menu = document.getElementById('menuContent').innerHTML;

    // Crea el HTML para imprimir
    const contenido = `
        <html>
        <head>
            <title>Plan Nutricional NutriKids</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1, h2, h3 { text-align: center; }
                .menu-day { margin-bottom: 1.5em; border-bottom: 1px solid #eee; }
                .meal { margin-left: 1em; }
            </style>
        </head>
        <body>
            <h1>NutriKids</h1>
            <h2>Plan Alimenticio Personalizado - 7 Días</h2>
            <h3>Datos del Estudiante</h3>
            <p><strong>Nombre:</strong> ${nombre}<br>
            <strong>Edad:</strong> ${edad}<br>
            <strong>Sexo:</strong> ${sexo}<br>
            <strong>Peso:</strong> ${peso} kg<br>
            <strong>Estatura:</strong> ${estatura} cm</p>
            <hr>
            <h3>Resultados de la Evaluación</h3>
            <p>${imc}<br>
            <strong>Clasificación:</strong> ${clasificacion}</p>
            <div>${recomendaciones}</div>
            <hr>
            <div>${menu}</div>
        </body>
        </html>
    `;

    // Abre una ventana e imprime
    const win = window.open('', '_blank');
    win.document.write(contenido);
    win.document.close();
    win.focus();
    win.print();
    // Puedes cerrar automáticamente la ventana después de imprimir:
    // win.close();
}

        // Inicializar partículas al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
        });

        // Efectos adicionales de interactividad
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
