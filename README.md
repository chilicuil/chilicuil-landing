# Chilicuil · abue ep

Sitio web oficial del EP *abue* de Chilicuil.

## Estructura del proyecto

```
chilicuil/
├── index.html        ← estructura de la página
├── css/
│   └── style.css     ← todos los estilos
├── js/
│   └── player.js     ← lógica del reproductor
└── audio/
    ├── MIXBUSS_C_02.wav               ← madoka
    ├── ABUE-CHILICUIL-REC_ROUGH.mp3  ← abue
    └── (sofá va aquí cuando esté lista)
```

## Cómo usar

1. Coloca los archivos de audio en la carpeta `audio/`
2. Abre `index.html` en tu navegador

## Agregar o editar canciones

Edita el arreglo `tracks` al inicio de `js/player.js`:

```js
const tracks = [
  {
    name: 'nombre de la canción',
    sub:  'subtítulo',
    file: 'audio/nombre-del-archivo.mp3',
  },
];
```

Deja `file: ''` si la canción aún no está lista — aparecerá como *próximamente*.

## Actualizar links de redes sociales

En `index.html`, busca la sección `#contacto` y cambia los `href="#"` por tus links reales:

```html
<a class="social-btn" href="https://open.spotify.com/artist/TU-ID">Spotify</a>
<a class="social-btn" href="https://instagram.com/chilicuil">Instagram</a>
```

## Subir a internet (gratis)

La forma más fácil es con **Netlify**:
1. Crea cuenta en netlify.com
2. Arrastra toda la carpeta `chilicuil/` al dashboard
3. Tu sitio queda en línea en segundos
