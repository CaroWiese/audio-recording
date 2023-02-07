/* // Script code and its different parts:
 // 1. start recording audio
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

  // 2. store audio data chunks while recording
      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

  // 4. convert audio data chunks into single audio blob
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);

  // 5. create URL for audio data blob
        const audioUrl = URL.createObjectURL(audioBlob);
      });

  // 6. play audio
        const audio = new Audio(audioUrl);
          const play = () => {
            audio.play();
          };

  // 3. stop recording audio
      setTimeout(() => {
        mediaRecorder.stop();
      }, 3000);
    })

    // ... and always check for errors
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
    }); */

/* // abstracting the native API into a simpler by converting 
// above into a function that returns a promise resolving 
// to an object that contains the API with two functions: 
// start and stop
// audioblob can be used to store data on server, 
// audioURL for custom behaviour related to playing the audio
const recordAudio = () => {
  return new Promise(resolve => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        const start = () => {
          mediaRecorder.start();
        };

        const stop = () => {
          return new Promise(resolve => {
            mediaRecorder.addEventListener("stop", () => {
              const audioBlob = new Blob(audioChunks);
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              const play = () => {
                audio.play();
              };

              resolve({ audioBlob, audioUrl, play });
            });

            mediaRecorder.stop();
          });
        };

        resolve({ start, stop });
      });
  });
};
 */

/* // how to use above simplified API :
(async () => {
  const recorder = await recordAudio();
  recorder.start();

  setTimeout(async () => {
    const audio = await recorder.stop();
    audio.play();
  }, 3000);
})();

// even simpler by removing the callback passed to setTimeout and 
// replace that with a call to a sleep function
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

(async () => {
  const recorder = await recordAudio();
  recorder.start();
  await sleep(3000);
  const audio = await recorder.stop();
  audio.play();
})(); */

// simplityiyng recordAudio even further by replacing the recordAudio's
// promise callback with an async function and using await in front of the call
// to getUserMedia
/* const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

(async () => {
  const recorder = await recordAudio();
  recorder.start();
  await sleep(3000);
  const audio = await recorder.stop();
  audio.play();
})(); */

// more robust by wrapping the recorder code in a try/catch statement and deal
// with any possible errors such as old browsers lacking support. If we want to
// have a better user experience, we can easily display the state to the user 
// either with plain JavaScript or with a framework/library of our choice (e.g. 
// React, Elm, Vue, Angular, etc). If we want to save the recorded audio blob on
// a server, we can send a request to the server with the audio blob as our payload. 
const recordAudio = () =>
  new Promise(async resolve => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    } catch {
      console.error(`${error.name}: ${error.message}`);
    }
  });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

(async () => {
  const recorder = await recordAudio();
  recorder.start();
  await sleep(3000);
  const audio = await recorder.stop();
  audio.play();
})();