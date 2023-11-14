# CustomPresta
Personalización de la pantalla de Circulación de Koha, se incorpora un elemento select, que permite seleccionar un tipo de préstamo: Normal, Sala, Único o Por el día.
Para poder realizar un préstamo se deberá optar por alguna de las opciones mencionadas, estas opciones condicionan o personalizan la configuración de préstamo.
El préstamo "Normal", deja que se realice el préstamo de acuerdo a las condiciones configuradas en las reglas de circulación.
El préstamo "En Sala", por defecto el préstamo se realiza por x horas, y durante el día.
El préstamo "Único", se presta a partir de una determinada hora, y la fecha de devolución se establece en el día siguiente hábil antes una hora establecida. 
El préstamo "Por el día", el préstamo se realiza el mismo día, y la hora de devolución es la establecida por el limite de horario de cierre. 
La personalización incluye un botón de configuración, para personalizar los horarios y limites de tiempo.

Para su utilización se deberá copiar el contenido de los archivos .JS y .CSS en las preferencias de sistema de Koha: IntranetUserJS e IntranetUserCSS.
Versión de Koha: 21.11.17

Esta personalización se realizaron en base a las necesidades del Sistema de Bibliotecas de la UNPSJB.
