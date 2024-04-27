from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

article = """Historia, tradición y baile se aúnan en las exhibiciones de danzas regionales valencianas llevadas a cabo por
las comisiones falleras: «Balls al Carrer»,  bailes típicos realizados en las calles y las plazas de la capital , así como
de los pueblos valencianos. Estos bailes tradicionales a ritmo de  dolçaina  y  tabalet , que es como se denomina en 
valenciano a la dulzaina y al tabal o tambor, tienen un carácter ritual que está asociado a los días de fiesta y son todo
un alarde de ritmo y coordinación. Como todo en la vida, precisan de una estructura y la de la danza valenciana está 
formada por una comitiva o procesión de parejas dirigidas desde la cabeza o la cola vestidos con trajes regionales.  
Estos dúos toman la forma del lugar donde se baila: alargada, si es de calle, o redonda, si es de una plaza.  Así 
colocados, siguen el ritmo del tabal y, cuando empieza a tocar la dulzaina, se van moviendo y desplazando al son de 
la melodía. En definitiva, con «Balls al Carrer» tienes una ocasión perfecta para conocer de cerca la indumentaria 
valenciana y la música de los instrumentos típicos de València. A continuación, tienes las fechas para que puedas celebrar
la tradición, por ocasiones no será."""

print(summarizer(article, max_length=130, min_length=30, do_sample=False))