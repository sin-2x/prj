import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import audioTrack from './audio/Bek_Nuriddinuly_Өзіңді_аңсап_Бек_Нуриддинұлы_Әні_Жәкен_Омаров.mp3';
import './styles.css';

const letterText = `Сәлем, қалайсың?
Біз бұрынғыдай жиі сөйлесіп, хабарласып жүрген жоқпыз. Бірақ мен үшін сенің аман-есен, сау-саламат жүргеніңді, әр күніңнің кешегіден жақсырақ өтіп жатқанын білудің өзі үлкен бақыт.
Сәлеміме жауап жазбасаң да, ішіңнен болса да сәлем деп қойшы. Маған «қалайсың?» демесең де, менің «қалайсың?» деген сұрағыма «жақсымын» деп ойша болса да жауап берші.
Кейде саған көп жазып, уайымдап кететінім бар. Аз ғана уақыт хал-жағдайыңды сұрамай, сенен хабар алмай тұра алмайтын сәттерім болады. Соған ренжи көрме.
Шынымды айтсам, мен сенен бір хабар күтіп, бір үмітпен өмір сүріп жүрмін. «Қайта оралар ма екен?» деген оймен таң атып, «Бүгін түсіме кірер ме екен?» деген оймен түн батамын.
Сені түсімде жиі көремін. Неге екенін өзім де білмеймін.
«Сен мен үшін бұл дүниенің көркісің» десем де, «сен мен үшін бәрісің» десем де ренжімеші. Себебі мен үшін сен расында да ерекше жансың.
Саған деген сезімімді толық жеткізуге сөзім жетпейді. Махаббатымды қанша сипаттағым келсе де, тілім кейде дәрменсіз болып қалады. Сондықтан саған бір ғана өтінішім бар — осы кітапты оқып шықшы. Мүмкін, мен айта алмаған сезімдерді сол кітап менің орныма жеткізер.
Кейде осындай сәттерде ақын болғанымда ғой деп ойлаймын. Саған арнап ән жазғым келеді, жүрегіме шабыт келеді, бірақ сезімім қаншалықты терең болса да, оны сөзбен жеткізуге тілім келтелік қылады...
Мені кешірші, бір ғана түсінбеушілік біздің арамыздағы барлық жақсы нәрселерден маңызды болып кетпесін.`;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${rest}`;
}

function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.72);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const syncTime = () => setCurrentTime(audio.currentTime);
    const syncDuration = () => setDuration(audio.duration || 0);
    const syncPause = () => setPlaying(false);
    const syncPlay = () => setPlaying(true);

    audio.volume = volume;
    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('loadedmetadata', syncDuration);
    audio.addEventListener('durationchange', syncDuration);
    audio.addEventListener('pause', syncPause);
    audio.addEventListener('play', syncPlay);

    return () => {
      audio.removeEventListener('timeupdate', syncTime);
      audio.removeEventListener('loadedmetadata', syncDuration);
      audio.removeEventListener('durationchange', syncDuration);
      audio.removeEventListener('pause', syncPause);
      audio.removeEventListener('play', syncPlay);
    };
  }, [volume]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  const seek = (event) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const changeVolume = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (audioRef.current) audioRef.current.volume = nextVolume;
  };

  return (
    <section className="audio-card" aria-label="Музыка басқару">
      <audio ref={audioRef} src={audioTrack} preload="metadata" />
      <button className="listen-button" type="button" onClick={toggle} aria-label={playing ? 'Әнді тоқтату' : 'Әнді тыңдау'}>
        <span className="listen-icon">{playing ? '❚❚' : '▶'}</span>
        <span>{playing ? 'Тоқтату' : 'Тыңдау'}</span>
      </button>
      <div className="track-info">
        <div className="track-title">Өзіңді аңсап</div>
        <input
          className="progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={seek}
          aria-label="Ән уақыты"
          style={{ '--value': `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
        <div className="time-row">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <label className="volume-control">
        <span>Дыбыс</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          aria-label="Дыбыс деңгейі"
          style={{ '--value': `${volume * 100}%` }}
        />
      </label>
    </section>
  );
}

function Snow() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 52 }, (_, index) => ({
        id: index,
        left: `${(index * 31) % 100}%`,
        delay: `${(index * 0.27) % 7}s`,
        duration: `${9 + (index % 8)}s`,
        size: `${4 + (index % 5)}px`,
      })),
    []
  );

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          style={{
            '--left': flake.left,
            '--delay': flake.delay,
            '--duration': flake.duration,
            '--size': flake.size,
          }}
        />
      ))}
    </div>
  );
}

function KazakhOrnament({ position }) {
  return (
    <div className={`kazakh-ornament ${position}`} aria-hidden="true">
      <svg viewBox="0 0 960 180" preserveAspectRatio="none" role="img">
        <path d="M0 12 C34 4 58 22 70 54 C84 90 54 118 26 104 C1 91 4 53 34 53 C52 53 64 66 61 84 C58 102 37 103 31 88 C47 94 55 84 48 73 C39 58 12 64 15 91 C18 124 60 133 91 107 C116 86 117 50 99 25 C137 31 164 55 182 91 C153 91 132 105 117 132 C152 119 182 124 207 149 C206 112 221 84 252 65 C217 65 191 50 174 19 C204 20 228 31 246 53 C269 82 301 83 323 58 C339 40 330 16 309 14 C288 12 275 31 287 47 C300 35 315 42 317 57 C320 80 292 93 267 79 C238 62 234 17 260 0 L366 0 C357 23 360 45 378 66 C392 82 414 86 432 75 C414 66 405 51 412 34 C420 14 448 11 464 29 C481 48 474 78 447 95 C421 110 388 102 367 79 C349 59 343 34 349 8 C325 49 326 93 351 141 C382 118 416 107 454 113 C432 128 418 150 414 180 L0 180 Z" />
        <path d="M960 12 C926 4 902 22 890 54 C876 90 906 118 934 104 C959 91 956 53 926 53 C908 53 896 66 899 84 C902 102 923 103 929 88 C913 94 905 84 912 73 C921 58 948 64 945 91 C942 124 900 133 869 107 C844 86 843 50 861 25 C823 31 796 55 778 91 C807 91 828 105 843 132 C808 119 778 124 753 149 C754 112 739 84 708 65 C743 65 769 50 786 19 C756 20 732 31 714 53 C691 82 659 83 637 58 C621 40 630 16 651 14 C672 12 685 31 673 47 C660 35 645 42 643 57 C640 80 668 93 693 79 C722 62 726 17 700 0 L594 0 C603 23 600 45 582 66 C568 82 546 86 528 75 C546 66 555 51 548 34 C540 14 512 11 496 29 C479 48 486 78 513 95 C539 110 572 102 593 79 C611 59 617 34 611 8 C635 49 634 93 609 141 C578 118 544 107 506 113 C528 128 542 150 546 180 L960 180 Z" />
        <path d="M480 0 C497 38 500 76 480 111 C460 76 463 38 480 0 Z" />
        <path d="M480 180 C463 142 460 104 480 69 C500 104 497 142 480 180 Z" />
        <path d="M377 88 C411 72 449 72 480 91 C449 110 411 110 377 88 Z" />
        <path d="M583 88 C549 72 511 72 480 91 C511 110 549 110 583 88 Z" />
      </svg>
    </div>
  );
}

function LoginGate({ onUnlock }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();

    if (login.trim() === 'Dinara' && password === '26052006') {
      sessionStorage.setItem('love-letter-unlocked', 'true');
      onUnlock();
      return;
    }

    setError('Логин немесе пароль дұрыс емес');
  };

  return (
    <main className="page login-page">
      <Snow />
      <KazakhOrnament position="top" />
      <KazakhOrnament position="bottom" />
      <form className="login-card" onSubmit={submit}>
        <span className="login-kicker">жеке хат</span>
        <h1>Тек саған</h1>
        <p className="login-hint">Логин — сенің атың. Құпия сөз — туған күнің, айың және жылың.</p>
        <label>
          <span>Логин</span>
          <input
            type="text"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            autoComplete="username"
            placeholder="Есіміңді латынша бас әріппен жаз"
          />
        </label>
        <label>
          <span>Құпия сөз</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="мысалы: 16062026"
          />
        </label>
        {error && <p className="login-error">{error}</p>}
        <button className="login-button" type="submit">Ашу</button>
      </form>
    </main>
  );
}

function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('love-letter-unlocked') === 'true');

  if (!unlocked) {
    return <LoginGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <main className="page">
      <Snow />
      <KazakhOrnament position="top" />
      <KazakhOrnament position="bottom" />
      <div className="shell">
        <AudioPlayer />
        <article className="letter">
          <div className="letter-mark">Ақ хат</div>
          <p>{letterText}</p>
        </article>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
