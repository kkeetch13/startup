import React from 'react';

export function Play() {
  return (
    <main>
      <div class="players">
        Player:
        <span class="player-name">Mystery player</span>
      </div>
      <ul class="notification">
        <li class="player-name">Tim started a new game</li>
        <li class="player-name">Ada started a new game</li>
        <li class="player-name">Tim won in 6 rounds </li>
        <li class="player-name">Ada lost!</li>
      </ul>

      <br />

      <div>
        <label for="count">Score</label>
        <input type="text" id="count" value="--" readonly />
      </div>

      <br />

      <div>
        <button>Reset</button>
      </div>

      <br />

      <div>
        <table>
          <tr>
            <td>
              <button>
              </button>
            </td>
            <td>
              <button>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                  <path d="M5,5 5,95 95,95 Q 95,5 5,5" fill="red" />
                </svg>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                  <path d="M5,5 95,5 95,95 Q 5,95 5,5" fill="blue" />
                </svg>
              </button>
            </td>
            <td>
              <button>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                  <path d="M95,5 5,5 5,95 Q 95,95 95,5" fill="yellow" />
                </svg>
              </button>
            </td>
          </tr>
        </table>
      
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Jones</td>
              <td>34</td>
              <td>29</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Cooper</td>
              <td>29</td>
              <td>14</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Alex</td>
              <td>7</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Sign in</h1>
      <form method="get" action="play.html">
        <div>
          <span>@</span>
          <input type="text" placeholder="your@email.com" />
        </div>
        <div>
          <span>🔒</span>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}